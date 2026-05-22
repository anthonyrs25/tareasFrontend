import { Segmented, Empty, App } from 'antd'
import { useState } from 'react'
import TaskForm from './TaskForm'
import TaskItem from './TaskItem'

interface Task {
  id: number
  title: string
  priority: string
  completed: boolean
}

interface Props {
  tasks: Task[]
  onAdd: (title: string, priority: string) => void
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

function TaskList({ tasks, onAdd, onDelete, onToggle }: Props) {
  const [filter, setFilter] = useState('Todas')

  const filtered = tasks.filter(t => {
    if (filter === 'Pendientes') return !t.completed
    if (filter === 'Completadas') return t.completed
    return true
  })

  return (
    <App>
      <div>
        <div className="page-header">
          <h2 className="page-title">Mis Tareas</h2>
          <p className="page-subtitle">{tasks.length} tareas en total</p>
        </div>

        <TaskForm onAdd={onAdd} />

        <Segmented
          className="filter-segmented"
          block
          options={['Todas', 'Pendientes', 'Completadas']}
          value={filter}
          onChange={val => setFilter(val as string)}
        />

        {filtered.length === 0 ? (
          <Empty
            description={
              <span style={{ color: '#374151' }}>
                {filter === 'Todas' ? 'No hay tareas aún' : `No hay tareas ${filter.toLowerCase()}`}
              </span>
            }
            style={{ padding: '40px 0' }}
          />
        ) : (
          filtered.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))
        )}
      </div>
    </App>
  )
}

export default TaskList