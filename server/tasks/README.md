# Tasks (example plugin)
This plugin registers routes and route handlers for "tasks" to the server. It also defines some object schemas for what a task JSON payload should look like, and exposes a global task `list` on the server so other plugins can easily access it from `request.server.plugins.tasks.list`.

Removing this plugin registration from `manifest.js` will remove all functionality defined by this plugin from the server.

To view auto-generated API docs for Tasks, visit [http://localhost:8000/documentation#!/api/getApiTasks](http://localhost:8000/documentation#!/api/getApiTasks).
