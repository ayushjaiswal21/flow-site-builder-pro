
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Save,
  SendHorizonal
} from "lucide-react";

const CreateTest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [testDetails, setTestDetails] = useState({
    title: "",
    description: "",
    category: "",
    duration: 30,
    passingScore: 70,
    questionCount: 20,
    accessType: "invited",
  });
  
  const [questions, setQuestions] = useState<any[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTestDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setTestDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSliderChange = (name: string, value: number[]) => {
    setTestDetails(prev => ({ ...prev, [name]: value[0] }));
  };

  const addQuestion = () => {
    setQuestions(prev => [
      ...prev, 
      { 
        id: Date.now(), 
        text: "", 
        type: "multiple-choice",
        options: [
          { id: 1, text: "", isCorrect: false },
          { id: 2, text: "", isCorrect: false },
        ],
      }
    ]);
  };
  
  const removeQuestion = (id: number) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };
  
  const updateQuestion = (id: number, data: any) => {
    setQuestions(prev => 
      prev.map(q => q.id === id ? { ...q, ...data } : q)
    );
  };
  
  const addOption = (questionId: number) => {
    setQuestions(prev => 
      prev.map(q => {
        if (q.id === questionId) {
          return { 
            ...q, 
            options: [
              ...q.options, 
              { id: q.options.length + 1, text: "", isCorrect: false }
            ]
          };
        }
        return q;
      })
    );
  };
  
  const removeOption = (questionId: number, optionId: number) => {
    setQuestions(prev => 
      prev.map(q => {
        if (q.id === questionId) {
          return { 
            ...q, 
            options: q.options.filter((o: any) => o.id !== optionId)
          };
        }
        return q;
      })
    );
  };
  
  const updateOption = (questionId: number, optionId: number, data: any) => {
    setQuestions(prev => 
      prev.map(q => {
        if (q.id === questionId) {
          return { 
            ...q, 
            options: q.options.map((o: any) => 
              o.id === optionId ? { ...o, ...data } : o
            )
          };
        }
        return q;
      })
    );
  };
  
  const handleNextStep = () => {
    if (step === 1) {
      if (!testDetails.title) {
        toast({
          variant: "destructive",
          title: "Missing information",
          description: "Please provide a test title.",
        });
        return;
      }
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSaveTest();
    }
  };
  
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSaveTest = () => {
    toast({
      title: "Test saved",
      description: "Your test has been created successfully!",
    });
    navigate("/hr/dashboard");
  };
  
  const handleSendInvitations = () => {
    toast({
      title: "Invitations sent",
      description: "Test invitations have been sent to candidates.",
    });
  };

  return (
    <DashboardLayout allowedRole="hr">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Create New Test</h1>
            <p className="text-muted-foreground">
              Design your custom assessment in 3 easy steps
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate("/hr/dashboard")}
            >
              Cancel
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={handleSaveTest}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
          </div>
        </div>
        
        {/* Progress steps */}
        <div className="relative">
          <div className="flex justify-between mb-2">
            <span className={`text-sm font-medium ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
              Test Details
            </span>
            <span className={`text-sm font-medium ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
              Add Questions
            </span>
            <span className={`text-sm font-medium ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
              Review & Assign
            </span>
          </div>
          <div className="overflow-hidden rounded-full bg-secondary h-2">
            <div 
              className="h-full bg-primary transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Step 1: Test Details */}
        {step === 1 && (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" required>Test Title</Label>
                  <Input 
                    id="title"
                    name="title"
                    value={testDetails.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Programming Skills Assessment"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    value={testDetails.description}
                    onChange={handleInputChange}
                    placeholder="Describe what this test measures and who it's for"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={testDetails.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="programming">Programming</SelectItem>
                      <SelectItem value="customer-service">Customer Service</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <Label>Test Duration (minutes)</Label>
                  <div className="space-y-2">
                    <Slider 
                      defaultValue={[testDetails.duration]} 
                      min={5}
                      max={120}
                      step={5}
                      onValueChange={(value) => handleSliderChange("duration", value)}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>5 min</span>
                      <span className="font-medium text-foreground">{testDetails.duration} min</span>
                      <span>120 min</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Passing Score (%)</Label>
                  <div className="space-y-2">
                    <Slider 
                      defaultValue={[testDetails.passingScore]} 
                      min={50}
                      max={100}
                      step={5}
                      onValueChange={(value) => handleSliderChange("passingScore", value)}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>50%</span>
                      <span className="font-medium text-foreground">{testDetails.passingScore}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Number of Questions</Label>
                  <div className="space-y-2">
                    <Slider 
                      defaultValue={[testDetails.questionCount]} 
                      min={5}
                      max={50}
                      step={5}
                      onValueChange={(value) => handleSliderChange("questionCount", value)}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>5</span>
                      <span className="font-medium text-foreground">{testDetails.questionCount}</span>
                      <span>50</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Access Type</Label>
                  <RadioGroup 
                    defaultValue={testDetails.accessType}
                    onValueChange={(value) => handleSelectChange("accessType", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="invited" id="invited" />
                      <Label htmlFor="invited">Invitation only (send email invitations)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public">Public link (anyone with the link can access)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Step 2: Add Questions */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Questions ({questions.length}/{testDetails.questionCount})
              </h2>
              <Button 
                onClick={addQuestion}
                disabled={questions.length >= testDetails.questionCount}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Question
              </Button>
            </div>
            
            {questions.length === 0 ? (
              <Card className="py-12">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <div className="bg-muted rounded-full p-3 mb-4">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No questions added yet</h3>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    Start adding questions to create your test. You can add up to {testDetails.questionCount} questions.
                  </p>
                  <Button onClick={addQuestion}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add your first question
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <Card key={question.id} className="relative">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Question {index + 1}</h3>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeQuestion(question.id)}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Remove question</span>
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`question-${question.id}`}>Question Text</Label>
                        <Textarea
                          id={`question-${question.id}`}
                          value={question.text}
                          onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                          placeholder="Enter your question here"
                          rows={2}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Question Type</Label>
                        <Select
                          value={question.type}
                          onValueChange={(value) => updateQuestion(question.id, { type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                            <SelectItem value="single-choice">Single Choice</SelectItem>
                            <SelectItem value="text">Text Answer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {(question.type === "multiple-choice" || question.type === "single-choice") && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <Label>Answer Options</Label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addOption(question.id)}
                              disabled={question.options.length >= 6}
                            >
                              <Plus className="mr-1 h-3 w-3" />
                              Add Option
                            </Button>
                          </div>
                          
                          <div className="space-y-3">
                            {question.options.map((option: any) => (
                              <div key={option.id} className="flex items-center gap-2">
                                {question.type === "multiple-choice" ? (
                                  <Checkbox 
                                    checked={option.isCorrect}
                                    onCheckedChange={(checked) => 
                                      updateOption(question.id, option.id, { isCorrect: !!checked })
                                    }
                                    id={`option-${question.id}-${option.id}`}
                                  />
                                ) : (
                                  <RadioGroup 
                                    value={question.options.find((o: any) => o.isCorrect)?.id.toString() || ""}
                                    onValueChange={(value) => {
                                      question.options.forEach((o: any) => {
                                        updateOption(
                                          question.id, 
                                          o.id, 
                                          { isCorrect: o.id.toString() === value }
                                        );
                                      });
                                    }}
                                  >
                                    <RadioGroupItem 
                                      value={option.id.toString()} 
                                      id={`option-${question.id}-${option.id}`}
                                    />
                                  </RadioGroup>
                                )}
                                
                                <div className="flex-1">
                                  <Input
                                    value={option.text}
                                    onChange={(e) => 
                                      updateOption(question.id, option.id, { text: e.target.value })
                                    }
                                    placeholder={`Option ${option.id}`}
                                  />
                                </div>
                                
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeOption(question.id, option.id)}
                                  disabled={question.options.length <= 2}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {question.type === "text" && (
                        <div className="p-4 border rounded-md bg-muted/50">
                          <p className="text-sm text-muted-foreground">
                            Text answer questions will need to be manually reviewed after submission.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {questions.length < testDetails.questionCount && (
              <div className="flex justify-center">
                <Button 
                  variant="outline"
                  onClick={addQuestion}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add another question
                </Button>
              </div>
            )}
          </div>
        )}
        
        {/* Step 3: Review and Assign */}
        {step === 3 && (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">Test Summary</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Title</p>
                      <p className="font-medium">{testDetails.title || "Untitled Test"}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Category</p>
                      <p className="font-medium">{testDetails.category || "Uncategorized"}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{testDetails.duration} minutes</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Passing Score</p>
                      <p className="font-medium">{testDetails.passingScore}%</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Questions</p>
                      <p className="font-medium">{questions.length}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Access Type</p>
                      <p className="font-medium">
                        {testDetails.accessType === "invited" ? "Invitation only" : "Public link"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">Assign Test</h2>
                  {testDetails.accessType === "invited" ? (
                    <div className="space-y-4">
                      <Label htmlFor="emails">Candidate Emails</Label>
                      <Textarea
                        id="emails"
                        placeholder="Enter email addresses separated by commas"
                        rows={4}
                      />
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleSendInvitations}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <SendHorizonal className="mr-2 h-4 w-4" />
                          Send Invitations
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Anyone with the link below can access this test.
                      </p>
                      <div className="flex gap-2">
                        <Input
                          readOnly
                          value="https://skillprove.com/t/abc123"
                        />
                        <Button variant="outline">Copy</Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Navigation buttons */}
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline"
            onClick={handlePreviousStep}
            disabled={step === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button 
            onClick={handleNextStep}
            disabled={step === 2 && questions.length === 0}
          >
            {step < 3 ? (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Finish & Save Test"
            )}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTest;
