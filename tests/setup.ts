import { beforeAll, afterAll } from "@jest/globals"

beforeAll(async () => {
  // Configuración inicial para tests
  // Por ejemplo, limpiar base de datos de test
  console.log("Setting up tests...")
})

afterAll(async () => {
  // Limpieza después de todos los tests
  console.log("Cleaning up tests...")
})
