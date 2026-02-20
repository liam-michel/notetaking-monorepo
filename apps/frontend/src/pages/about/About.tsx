import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function About() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>About This App</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">This app helps you manage and share your CS2 strategy guides.</p>
        </CardContent>
      </Card>
    </div>
  )
}
