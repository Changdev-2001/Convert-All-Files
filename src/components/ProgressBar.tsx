interface ProgressBarProps {
  progress: number;
  status: string;
  error?: boolean;
}

export default function ProgressBar({ progress, status, error = false }: ProgressBarProps) {
  return (
    <div className="w-full space-y-3 p-4 bg-card rounded-lg border">
      <div className="flex justify-between text-sm">
        <span className={`font-medium ${error ? 'text-destructive' : 'text-foreground'}`}>{status}</span>
        <span className="text-foreground font-medium">{Math.round(progress)}%</span>
      </div>
      <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ease-in-out rounded-full ${error ? 'bg-destructive' : 'bg-primary'}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {progress === 100 && !error && (
        <div className="text-center text-sm text-primary font-medium mt-2">
          Conversion complete! Your file is ready to download.
        </div>
      )}
      {error && (
        <div className="text-center text-sm text-destructive font-medium mt-2">
          An error occurred during conversion. Please try again.
        </div>
      )}
    </div>
  );
}