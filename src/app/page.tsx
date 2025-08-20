import ConversionCard from '@/components/ConversionCard';

const conversionOptions = [
  {
    title: 'PDF to Word',
    description: 'Convert PDF files to editable Word documents',
    icon: '/file.svg',
    href: '/convert/pdf-to-word',
  },
  {
    title: 'Word to PDF',
    description: 'Convert Word documents to PDF format',
    icon: '/file.svg',
    href: '/convert/word-to-pdf',
  },
  {
    title: 'Image to Word',
    description: 'Convert images to Word documents with OCR',
    icon: '/file.svg',
    href: '/convert/image-to-word',
  },
  {
    title: 'Word to Image',
    description: 'Convert Word documents to image formats',
    icon: '/file.svg',
    href: '/convert/word-to-image',
  },
  {
    title: 'Excel to PDF',
    description: 'Convert Excel spreadsheets to PDF format',
    icon: '/file.svg',
    href: '/convert/excel-to-pdf',
  },
  {
    title: 'PPT to PDF',
    description: 'Convert PowerPoint presentations to PDF',
    icon: '/file.svg',
    href: '/convert/ppt-to-pdf',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen pt-20 pb-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-block animate-bounce bg-primary/10 p-2 rounded-full mb-4">
            <span className="text-2xl">🚀</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Convert any file format
            <span className="text-primary"> in seconds</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Free online tool to convert PDF, Word, Excel, PowerPoint, and image files.
            Fast, secure, and easy to use.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a 
              href="#conversion-options" 
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
            </a>
            <a 
              href="/about" 
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>

        <div id="conversion-options" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {conversionOptions.map((option) => (
            <ConversionCard
              key={option.href}
              title={option.title}
              description={option.description}
              icon={option.icon}
              href={option.href}
            />
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-6">Why Choose Convert All Files?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">⚡</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Fast Conversion</h3>
              <p className="text-muted-foreground">Convert your files in seconds with our optimized processing engine.</p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🔒</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">Your files are processed securely and deleted after conversion.</p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">💯</span>
              </div>
              <h3 className="text-lg font-medium mb-2">High Quality</h3>
              <p className="text-muted-foreground">Maintain the highest quality in your converted documents and images.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
