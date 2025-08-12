


const LogIn=()=>{
    return(

        <>
         <div className="relative z-10 md:p-10 border border-tranparent rounded-lg card-enter shadow-2xl flex max-w-md w-full flex-col justify-center px-6 py-12 lg:px-8  bg-slate-800 bg-opacity-70 backdrop-blur-lg">
        <div className="text-center mb-8">
          <h1 className="tracking-tight text-white font-bold">Access Terminal</h1>
          <p className="mt-10 text-center tracking-tight text-white">Log in to your CyberShield dashboard</p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-slate-300">
                Auth Id
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="user@cybershield.com"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-slate-300">
                  Secure Key
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot secure key?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="*******"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md  px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg shadow-none hover:shadow-sky-700 bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                LogIn
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{' '}
            <a href="user/signIn" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
        
        
        </>
    )
}


export default LogIn;