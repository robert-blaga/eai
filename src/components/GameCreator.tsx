import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Plus, Save } from "lucide-react"

export default function GameCreator() {
  const [questions, setQuestions] = useState([
    {
      title: "",
      subtitle: "",
      options: [
        { text: "", effort: 0, impact: 0 },
        { text: "", effort: 0, impact: 0 },
      ],
    },
  ])

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: "",
        subtitle: "",
        options: [
          { text: "", effort: 0, impact: 0 },
          { text: "", effort: 0, impact: 0 },
        ],
      },
    ])
  }

  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options.push({ text: "", effort: 0, impact: 0 })
    setQuestions(newQuestions)
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Create a New Quiz</h1>
      
      <div className="space-y-4">
        <Input placeholder="Game Title" className="text-lg" />
        <Textarea placeholder="Game Description" className="h-24" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: "Engagement", value: 75 },
          { name: "Happiness", value: 60 },
          { name: "Adoption", value: 90 },
          { name: "Retention", value: 85 },
        ].map((tracker) => (
          <Card key={tracker.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{tracker.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={tracker.value} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">{tracker.value}% reached</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="questions-container">
        {questions.map((question, qIndex) => (
          <Card key={qIndex} className="p-6 question-card">
            <div className="space-y-4">
              <Input placeholder="Question Title" className="text-lg font-semibold" />
              <Textarea placeholder="Question Subtitle/Paragraph" className="h-20" />
              
              <div className="space-y-4">
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center space-x-4">
                    <Input placeholder="Option text" className="flex-grow" />
                    <Input type="number" placeholder="Effort" className="w-20" />
                    <Input type="number" placeholder="Impact" className="w-20" />
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="sm" onClick={() => addOption(qIndex)}>
                <Plus className="mr-2 h-4 w-4" /> Add Option
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button onClick={addQuestion}>
          <Plus className="mr-2 h-4 w-4" /> Add Question
        </Button>
        <Button>
          <Save className="mr-2 h-4 w-4" /> Save Game
        </Button>
      </div>
    </div>
  )
}