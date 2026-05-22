import { Card, Button, Divider, Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'

interface Task {
  id: number
  completed: boolean
}

interface Props {
  tasks: Task[]
}

function Home({ tasks }: Props) {
  const navigate = useNavigate()
  const total = tasks.length
  const completed = tasks.filter(t => t.completed).length
  const pending = total - completed

  return (
    <div className="home-wrapper">
      <Card className="home-card">
        <h1 className="home-title">Sistema<br />de Tareas</h1>
        <p className="home-subtitle">
          Organiza tu día. Mantén el control.<br />Simple y efectivo.
        </p>

        <Divider className="home-divider" />

        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 28 }}>
          <Tooltip title="Tareas completadas">
            <div className="home-stat">
              <CheckCircleOutlined style={{ color: '#1ed760', fontSize: 20 }} />
              <span className="home-stat-number" style={{ color: '#1ed760' }}>{completed}</span>
              <span className="home-stat-label">Completadas</span>
            </div>
          </Tooltip>
          <Tooltip title="Tareas pendientes">
            <div className="home-stat">
              <ClockCircleOutlined style={{ color: '#0070f3', fontSize: 20 }} />
              <span className="home-stat-number" style={{ color: '#0070f3' }}>{pending}</span>
              <span className="home-stat-label">Pendientes</span>
            </div>
          </Tooltip>
        </div>

        <div className="home-buttons">
          <Button className="btn-primary" onClick={() => navigate('/tasks')}>
            Ir a Tareas
          </Button>
          <Button className="btn-secondary" onClick={() => navigate('/stats')}>
            Ver Estadísticas
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Home