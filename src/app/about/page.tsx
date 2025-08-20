export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">About Convert All Files</h1>
        
        <div className="prose prose-lg dark:prose-invert">
          <p>
            Convert All Files is a free online tool that helps you convert files between different formats
            quickly and easily. Our platform supports a wide range of file formats including PDF, Word,
            Excel, PowerPoint, and various image formats.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
          <ul className="space-y-2">
            <li>Convert PDF files to editable Word documents and vice versa</li>
            <li>Transform images to text using advanced OCR technology</li>
            <li>Convert Excel spreadsheets and PowerPoint presentations to PDF</li>
            <li>Batch conversion support for multiple files</li>
            <li>Secure and private file processing</li>
            <li>No registration required</li>
            <li>Instant downloads of converted files</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How It Works</h2>
          <ol className="space-y-2">
            <li>Select your desired conversion type from the home page</li>
            <li>Upload your file(s) using drag-and-drop or file selection</li>
            <li>Wait for the conversion to complete</li>
            <li>Download your converted file</li>
          </ol>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Privacy & Security</h2>
          <p>
            We take your privacy seriously. All uploaded files are processed securely and are automatically
            deleted from our servers after the conversion is complete. We never store or share your files
            with third parties.
          </p>
        </div>
      </div>
    </main>
  );
}