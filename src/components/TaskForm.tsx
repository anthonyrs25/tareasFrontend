import { useState } from 'react'
import { Input, Select, Button, Card, App } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface Props {
  onAdd: (title: string, priority: string) => void
}

function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Media')
  const { message } = App.useApp()

  const handleSubmit = () => {
    if (!title.trim()) {
      message.warning('Escribe el nombre de la tarea')
      return
    }
    onAdd(title.trim(), priority)
    message.success('Tarea agregada')
    setTitle('')
    setPriority('Media')
  }

  return (
    <Card className="form-card">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Input
          placeholder="¿Qué necesitas hacer?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onPressEnter={handleSubmit}
        />
        <Select
          value={priority}
          onChange={setPriority}
          style={{ width: '100%' }}
          options={[
            { value: 'Alta', label: '🔴 Alta prioridad' },
            { value: 'Media', label: '🟡 Media prioridad' },
            { value: 'Baja', label: '🟢 Baja prioridad' },
          ]}
        />
        <Button className="btn-add" block icon={<PlusOutlined />} onClick={handleSubmit}>
          Agregar tarea
        </Button>
      </div>
    </Card>
  )
}

export default TaskForm