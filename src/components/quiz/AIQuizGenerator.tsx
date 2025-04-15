
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoaderCircle, Sparkles, RefreshCw, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface AIQuizGeneratorProps {
  testDetails: {
    title: string;
    description: string;
    category: string;
    questionCount: number;
    dueDate?: Date;
    timeLimit?: number;
  };
  onQuestionsGenerated: (questions: any[]) => void;
  onSettingsUpdated?: (settings: {
    dueDate?: Date;
    timeLimit?: number;
  }) => void;
}

export function AIQuizGenerator({ 
  testDetails, 
  onQuestionsGenerated,
  onSettingsUpdated
}: AIQuizGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [aiConfig, setAIConfig] = useState({
    topic: testDetails.title || "",
    instructions: testDetails.description || "",
    difficulty: "medium",
    questionCount: testDetails.questionCount,
    dueDate: testDetails.dueDate || undefined,
    timeLimit: testDetails.timeLimit || 30,
  });

  const handleChange = (field: string, value: string | number | Date | undefined) => {
    const newConfig = {
      ...aiConfig,
      [field]: value
    };
    
    setAIConfig(newConfig);
    
    // Update parent component with deadline and time limit
    if (onSettingsUpdated && (field === 'dueDate' || field === 'timeLimit')) {
      onSettingsUpdated({
        dueDate: newConfig.dueDate,
        timeLimit: newConfig.timeLimit,
      });
    }
  };

  const generateQuestions = () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Generate sample questions based on the topic and difficulty
      const generatedQuestions = Array.from({ length: aiConfig.questionCount }, (_, i) => {
        // Simulate different question types
        const questionType = i % 3 === 0 ? "text" : (i % 2 === 0 ? "multiple-choice" : "single-choice");
        
        let options: any[] = [];
        
        if (questionType !== "text") {
          // Generate 4 options for multiple/single choice questions
          options = Array.from({ length: 4 }, (_, j) => ({
            id: j + 1,
            text: `Sample ${aiConfig.topic} option ${j + 1} (${aiConfig.difficulty} difficulty)`,
            isCorrect: j === 0 // First option is correct by default
          }));
        }
        
        return {
          id: Date.now() + i,
          text: `Sample ${aiConfig.topic} question ${i + 1} (${aiConfig.difficulty} difficulty)`,
          type: questionType,
          options
        };
      });
      
      setLoading(false);
      onQuestionsGenerated(generatedQuestions);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">AI Quiz Generator</h2>
      </div>
      
      <p className="text-muted-foreground">
        Provide information about the quiz you want to create and our AI will generate questions for you.
      </p>
      
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Quiz Topic</Label>
            <Input 
              id="topic" 
              value={aiConfig.topic}
              onChange={(e) => handleChange("topic", e.target.value)}
              placeholder="E.g., JavaScript Fundamentals, Marketing Strategies, etc."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select 
              value={aiConfig.difficulty}
              onValueChange={(value) => handleChange("difficulty", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="questionCount">Number of Questions</Label>
            <Input 
              id="questionCount" 
              type="number"
              min={5}
              max={50}
              value={aiConfig.questionCount}
              onChange={(e) => handleChange("questionCount", parseInt(e.target.value) || 10)}
            />
            <p className="text-xs text-muted-foreground">
              We recommend between 5-50 questions
            </p>
          </div>
          
          {/* New time limit field */}
          <div className="space-y-2">
            <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
            <Input 
              id="timeLimit" 
              type="number"
              min={5}
              max={180}
              value={aiConfig.timeLimit}
              onChange={(e) => handleChange("timeLimit", parseInt(e.target.value) || 30)}
            />
            <p className="text-xs text-muted-foreground">
              How long candidates have to complete the test
            </p>
          </div>
          
          {/* New due date field */}
          <div className="space-y-2">
            <Label>Submission Deadline (optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {aiConfig.dueDate ? format(aiConfig.dueDate, "PPP") : <span>Select deadline</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={aiConfig.dueDate}
                  onSelect={(date) => handleChange("dueDate", date)}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">
              The date by which candidates must complete the test
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Additional Instructions (Optional)</Label>
            <Textarea 
              id="instructions"
              value={aiConfig.instructions}
              onChange={(e) => handleChange("instructions", e.target.value)}
              placeholder="Include specific topics, focus areas, or instructions for the AI"
              rows={3}
            />
          </div>

          <Button 
            className="w-full mt-4" 
            onClick={generateQuestions}
            disabled={loading || !aiConfig.topic}
          >
            {loading ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Generating Questions...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Questions
              </>
            )}
          </Button>

          {loading && (
            <div className="text-center text-sm text-muted-foreground animate-pulse">
              Our AI is creating questions for your quiz...
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        <p className="flex items-center gap-1">
          <RefreshCw className="h-4 w-4" />
          You'll be able to review and edit all questions after generation
        </p>
      </div>
    </div>
  );
}
