import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu, Badge } from 'antd'
import {
  HomeOutlined,
  CheckSquareOutlined,
  BarChartOutlined,
} from '@ant-design/icons'
import Home from './components/Home'
import TaskList from './components/TaskList'
import Stats from './components/Stats'

const { Sider, Content } = Layout

interface Task {
  id: number
  title: string
  priority: string
  completed: boolean
}

function AppLayout() {
  const [tasks, setTasks] = useState<Task[]>([])
  const navigate = useNavigate()
  const location = useLocation()

  const pending = tasks.filter(t => !t.completed).length

  const addTask = (title: string, priority: string) => {
    setTasks([...tasks, { id: Date.now(), title, priority, completed: false }])
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: 'Inicio' },
    {
      key: '/tasks',
      icon: <CheckSquareOutlined />,
      label: (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Tareas
          {pending > 0 && (
            <Badge count={pending} style={{ background: '#0070f3', marginLeft: 8 }} />
          )}
        </span>
      )
    },
    { key: '/stats', icon: <BarChartOutlined />, label: 'Estadísticas' },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={220} className="app-sider">
        <div className="sider-logo">
          <h2>Sistema de<br />Tareas</h2>
          <p>Gestión personal</p>
        </div>
        <Menu
          className="app-menu"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Content className="app-content">
        <Routes>
          <Route path="/" element={<Home tasks={tasks} />} />
          <Route path="/tasks" element={
            <TaskList tasks={tasks} onAdd={addTask} onDelete={deleteTask} onToggle={toggleTask} />
          } />
          <Route path="/stats" element={<Stats tasks={tasks} />} />
        </Routes>
      </Content>
    </Layout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App