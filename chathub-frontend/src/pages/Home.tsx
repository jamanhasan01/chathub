const Home = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="relative">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-purple-500/20 blur-3xl -z-10 rounded-full" />
        
        {/* Content */}
        <div className="text-center space-y-6 p-8">
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-brand-blue via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Welcome to ChatFlow
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-md">
            Your conversations are just a click away
          </p>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-border to-transparent mx-auto" />
          <p className="text-sm text-muted-foreground/70">
            Select a contact from the sidebar to start chatting
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home