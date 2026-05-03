const endpoints = [
  {
    method: 'POST',
    path: '/api/v1/users/register',
    label: 'Register User',
    body: `{\n  "email": "user@domain.com",\n  "password": "test@123",\n  "role": "USER",\n  "username": "johndoe"\n}`,
  },
  {
    method: 'POST',
    path: '/api/v1/users/login',
    label: 'Login User',
    body: `{\n  "password": "test@123",\n  "username": "johndoe"\n}`,
  },
  {
    method: 'POST',
    path: '/api/v1/users/logout',
    label: 'Logout User',
    body: null,
  },
  {
    method: 'GET',
    path: '/api/v1/users/current-user',
    label: 'Get Current User',
    body: null,
  },
]

const methodColor = {
  GET: 'bg-green-100 text-green-700',
  POST: 'bg-blue-100 text-blue-700',
}

export default function ApiInfo() {
  return (
    <div className="h-full flex flex-col gap-4">
      <div>
        <h1 className="text-lg font-bold text-gray-800">Auth API</h1>
        <p className="text-xs text-gray-400 mt-0.5">api.freeapi.app</p>
      </div>

      <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs text-green-700 font-medium">Backend Online</span>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Endpoints</p>
        {endpoints.map((ep) => (
          <div key={ep.path} className="bg-gray-50 rounded-xl p-3 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${methodColor[ep.method]}`}>
                {ep.method}
              </span>
              <span className="text-xs font-medium text-gray-700">{ep.label}</span>
            </div>
            <p className="text-xs text-gray-400 font-mono break-all">{ep.path}</p>
            {ep.body && (
              <pre className="text-xs bg-gray-100 text-gray-600 rounded-lg p-2 overflow-x-auto leading-relaxed">
                {ep.body}
              </pre>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-3 border-t border-gray-100 space-y-1">
        <p className="text-xs text-gray-400">Auth method: <span className="text-gray-600 font-medium">Cookie-based session</span></p>
        <p className="text-xs text-gray-400">Base URL: <span className="text-gray-600 font-mono">api.freeapi.app</span></p>
      </div>
    </div>
  )
}
