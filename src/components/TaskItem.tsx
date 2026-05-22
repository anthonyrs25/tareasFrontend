import { Tag, Tooltip, Popconfirm, App } from 'antd'
import { CheckOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons'

interface Task {
  id: number
  title: string
  priority: string
  completed: boolean
}

interface Props {
  task: Task
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

const priorityColor: Record<string, string> = {
  Alta: 'red',
  Media: 'gold',
  Baja: 'green',
}

function TaskItem({ task, onDelete, onToggle }: Props) {
  const { message } = App.useApp()

  const handleToggle = () => {
    onToggle(task.id)
    message.success(task.completed ? 'Tarea reabierta' : '¡Tarea completada!')
  }

  const handleDelete = () => {
    onDelete(task.id)
    message.error('Tarea eliminada')
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Tag color={priorityColor[task.priority]}>{task.priority}</Tag>
        <span className={`task-title ${task.completed ? 'done' : ''}`}>
          {task.title}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Tooltip title={task.completed ? 'Reabrir' : 'Completar'}>
          <button
            onClick={handleToggle}
            style={{
              background: task.completed ? 'rgba(255,255,255,0.05)' : 'rgba(30,215,96,0.12)',
              border: `1px solid ${task.completed ? 'rgba(255,255,255,0.08)' : 'rgba(30,215,96,0.25)'}`,
              color: task.completed ? '#4b5563' : '#1ed760',
              borderRadius: 8,
              padding: '5px 12px',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            {task.completed ? <UndoOutlined /> : <CheckOutlined />}
            {task.completed ? 'Reabrir' : 'Listo'}
          </button>
        </Tooltip>

        <Popconfirm
          title="¿Eliminar esta tarea?"
          description="Esta acción no se puede deshacer."
          onConfirm={handleDelete}
          okText="Sí, eliminar"
          cancelText="Cancelar"
          okButtonProps={{ danger: true }}
        >
          <Tooltip title="Eliminar">
            <button
              style={{
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.2)',
                color: '#ef4444',
                borderRadius: 8,
                padding: '5px 12px',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <DeleteOutlined />
              Eliminar
            </button>
          </Tooltip>
        </Popconfirm>
      </div>
    </div>
  )
}

export default TaskItem