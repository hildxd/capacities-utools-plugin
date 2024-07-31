import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useState } from "react"
import { CAPACITIESKEY } from "./constants"
import { useToast } from "./components/ui/use-toast"

function App() {
  const [capacitiesKey, setCapacitiesKey] = useState<string>('')
  const [revId, setRevId] = useState<string | null>(null)

  useEffect(() => {
    const res = window.utools.db.get(CAPACITIESKEY)
    if (res) {
      setCapacitiesKey(res.data)
      setRevId(res._rev ?? null)
    }
  }, [])
  const { toast } = useToast()

  const handleSave = useCallback(() => {

    const dbDoc: DbDoc = {
      _id: CAPACITIESKEY,
      data: capacitiesKey
    }
    if (revId) {
      dbDoc._rev = revId
    }
    const res = window.utools.db.put(dbDoc)
    if (res.error) {
      toast({
        variant: "destructive",
        title: '保存失败',
        description: res.message,
      })
      return
    }
    toast({
      title: '保存成功',
      description: res.message,
    })
    setRevId(res.rev ?? null)

  }, [capacitiesKey])


  return (
    <div className="w-full flex justify-center mt-5">
      <div className="flex items-center space-x-2">
        <Label htmlFor="capacities-key">Capacities Token:</Label>
        <div className="w-70">
          <Input id="capacities-key" value={capacitiesKey} onChange={e => setCapacitiesKey(e.target.value)} />
        </div>
        <Button onClick={handleSave}>保存</Button>
      </div>
    </div>
  )
}

export default App
