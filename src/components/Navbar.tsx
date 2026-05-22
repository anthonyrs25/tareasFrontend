import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const items = [
    { key: '/', label: 'Inicio' },
    { key: '/tasks', label: 'Tareas' },
    { key: '/stats', label: 'Estadísticas' },
  ]

  return (
    <div className="navbar">
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={items}
        onClick={({ key }) => navigate(key)}
      />
    </div>
  )
}

export default Navbar