import { Clapperboard } from 'lucide-react'

const ErrorState = ({typeMedia,errorState}:{typeMedia:"tv"|"movies",errorState:Error | null}) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4 text-center">
           <Clapperboard size={42} className="text-red-500" />
   
           <h2 className="text-xl font-bold text-(--text-primary)">
             Something went wrong
           </h2>
   
           <p className="text-(--text-secondary)">
             {errorState instanceof Error
               ? errorState.message
               : `Failed to load ${typeMedia}`}
           </p>
   
           <button
             onClick={() => window.location.reload()}
             className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
           >
             Try Again
           </button>
         </div>
  )
}

export default ErrorState
