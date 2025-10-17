import { useState, useEffect } from 'react'
import { Container, Typography, Box, Alert, Card, CardContent } from '@mui/material'

function App() {
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkHealth()
  }, [])

  const checkHealth = async () => {
    try {
      const response = await fetch('/health')
      const data = await response.json()
      setHealth(data)
    } catch (error) {
      setHealth({ status: 'Error', error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          🚀 SISGAD5 - Frontend
        </Typography>

        <Typography variant="h6" color="text.secondary" gutterBottom align="center">
          Sistema de Información para la Gestión y Apoyo a la Dirección de Atención al Gobierno No. 5
        </Typography>

        <Card sx={{ maxWidth: 600, margin: '0 auto', mt: 4 }}>
          <CardContent>
            {loading ? (
              <Typography align="center">Cargando estado del sistema...</Typography>
            ) : health?.status === 'OK' ? (
              <Alert severity="success">
                ✅ Backend conectado correctamente
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Base de datos: {health.database}
                  <br />
                  Timestamp: {new Date(health.timestamp).toLocaleString()}
                </Typography>
              </Alert>
            ) : (
              <Alert severity="error">
                ❌ Error conectando con el backend
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {health?.error}
                </Typography>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            Próximos pasos:
          </Typography>
          <ul style={{ display: 'inline-block', textAlign: 'left' }}>
            <li>Configurar base de datos PostgreSQL</li>
            <li>Generar modelos automáticamente</li>
            <li>Desarrollar componentes principales</li>
            <li>Implementar autenticación</li>
          </ul>
        </Box>
      </Box>
    </Container>
  )
}

export default App