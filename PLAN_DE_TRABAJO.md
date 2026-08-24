# PLAN DE TRABAJO — MAMALONES

## FASE 01 — ESTABILIZACIÓN

- [ ] 01. Auditoría y validación completa del proyecto
- [ ] 02. Corregir errores de lint
- [ ] 03. Corregir errores TypeScript
- [ ] 04. Normalizar modelo de datos de cargas
- [ ] 05. Normalizar estados de carga
- [ ] 06. Centralizar acceso a Supabase
- [ ] 07. Eliminar credenciales fallback del código

## FASE 02 — AUTENTICACIÓN Y PERFILES

- [ ] 08. Validar sesión real
- [ ] 09. Proteger rutas privadas
- [ ] 10. Implementar rol real del usuario
- [ ] 11. Completar perfil de dueño
- [ ] 12. Completar perfil de empresa
- [ ] 13. Completar perfil de operador

## FASE 03 — CARGAS

- [ ] 14. Crear cargas reales
- [ ] 15. Listar cargas reales
- [ ] 16. Filtrar cargas por permisos
- [ ] 17. Implementar postulación real
- [ ] 18. Implementar asignación de unidad
- [ ] 19. Implementar ciclo de estados

## FASE 04 — OPERACIÓN

- [ ] 20. Completar módulo de báscula
- [ ] 21. Completar módulo de caseta
- [ ] 22. Completar rastreo
- [ ] 23. Completar incidentes
- [ ] 24. Completar entrega
- [ ] 25. Crear historial operativo

## FASE 05 — FISCAL Y DOCUMENTOS

- [ ] 26. Completar Carta Porte
- [ ] 27. Validar datos fiscales
- [ ] 28. Implementar Supabase Storage
- [ ] 29. Implementar documentos asociados a carga

## FASE 06 — DASHBOARD

- [ ] 30. Dashboard con sesión real
- [ ] 31. Métricas reales
- [ ] 32. Flota real
- [ ] 33. Viajes reales
- [ ] 34. Rastreo/GPS real
- [ ] 35. Permisos por rol

## FASE 07 — CONFIGURACIÓN

- [ ] 36. Persistir perfil
- [ ] 37. Persistir configuración de ruta
- [ ] 38. Persistir documentos
- [ ] 39. Cancelación/eliminación segura

## FASE 08 — SEGURIDAD

- [ ] 40. Revisar RLS
- [ ] 41. Revisar permisos por rol
- [ ] 42. Proteger operaciones críticas
- [ ] 43. Auditoría de cambios

## FASE 09 — CALIDAD

- [ ] 44. Tests
- [ ] 45. Lint
- [ ] 46. TypeScript
- [ ] 47. Build
- [ ] 48. Smoke tests

## FASE 10 — PRODUCCIÓN

- [ ] 49. Variables de entorno
- [ ] 50. Deploy
- [ ] 51. Verificación final

## REGLA DE EJECUCIÓN

La automatización debe trabajar una tarea a la vez.

No avanzar a la siguiente tarea si:
- lint falla
- TypeScript falla
- build falla
- una prueba crítica falla

Cada tarea completada debe generar:
1. cambios de código
2. validación
3. commit
4. registro de la tarea completada

Nunca modificar main directamente durante el desarrollo automático.
