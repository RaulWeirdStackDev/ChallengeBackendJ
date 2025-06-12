import app from "./app"

const PORT = process.env.PORT || 3000

// Solo iniciar el servidor cuando este archivo se ejecute directamente
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`)
  })
}

export default app
