import { Statistic, Card, Progress } from 'antd'
import { CheckCircleOutlined, ClockCircleOutlined, UnorderedListOutlined } from '@ant-design/icons'

interface Task {
  id: number
  title: string
  priority: string
  completed: boolean
}

interface Props {
  tasks: Task[]
}

function Stats({ tasks }: Props) {
  const total = tasks.length
  const completed = tasks.filter(t => t.completed).length
  const pending = total - completed
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Estadísticas</h2>
        <p className="page-subtitle">Resumen de tu progreso</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card ant-card">
          <Statistic
            title="Total"
            value={total}
            prefix={<UnorderedListOutlined />}
          />
        </div>
        <div className="stat-card ant-card">
          <Statistic
            title="Completadas"
            value={completed}
            valueStyle={{ color: '#1ed760' }}
            prefix={<CheckCircleOutlined />}
          />
        </div>
        <div className="stat-card ant-card">
          <Statistic
            title="Pendientes"
            value={pending}
            valueStyle={{ color: '#0070f3' }}
            prefix={<ClockCircleOutlined />}
          />
        </div>
      </div>

      <Card className="progress-card">
        <div className="progress-label">
          <span>Progreso general</span>
          <strong>{percent}% completado</strong>
        </div>
        <Progress
          percent={percent}
          strokeColor={{ '0%': '#0070f3', '100%': '#1ed760' }}
          trailColor="rgba(255,255,255,0.06)"
          showInfo={false}
          strokeWidth={10}
          strokeLinecap="round"
        />
        {total === 0 && (
          <p style={{ color: '#374151', fontSize: 13, textAlign: 'center', marginTop: 16 }}>
            Agrega tareas para ver tu progreso
          </p>
        )}
      </Card>
    </div>
  )
}

export default Stats