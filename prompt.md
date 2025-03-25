Crear una aplicación web utilizando el siguiente stack:
- Frontend: React y Tailwind para los estilos
- Backend: Un microservicio en express.js

Requerimientos funcionales:
- El aplicativo permitirá ingresar los detalles de su portafolio hasta 5 compras, con el detalle de: tickers, monto o cantidad y fecha/hora de compra
- El aplicativo mostrará un botón Procesar que iniciará una análisis diagnóstico de la cartera del inversionista:
  	•	Dashboard resumen:
		•	Valor actual total.
		•	Distribución por tipo (Acciones, ETFs, sectores, regiones).
		•	Visualización interactiva con gráficos (pie, barras).
	•	Análisis descriptivo:
		•	Retorno histórico promedio mensual/anual.
		•	Volatilidad histórica (desviación estándar).
		•	Correlación histórica entre activos.
	•	Indicadores básicos:
		•	Rentabilidad acumulada.
		•	Comparación visual con índices (S&P500, Nasdaq, ETF relevantes).
		•	Evolución gráfica de retornos acumulados.
- Evaluación Actual del Riesgo:
	•	Indicadores Avanzados de Riesgo:
		•	Cálculo automático del Ratio Sharpe, Sortino, y Treynor.
		•	Volatilidad anualizada.
		•	Máximo Drawdown histórico.

Requerimientos NO funcionales:
- Se debe tratar de una SPA que tenga la capacidad de adaptarse a pantallas de móviles.
- Los colores principales serán azul marino y verde claro
- La aplicación obtendrá la información de los tickers desde Yahoo Finance
