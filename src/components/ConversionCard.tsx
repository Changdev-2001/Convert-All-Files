import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface ConversionCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export default function ConversionCard({
  title,
  description,
  icon,
  href,
}: ConversionCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="shrink-0 p-3 bg-primary/10 rounded-lg">
            <Image src={icon} alt={title} width={40} height={40} className="h-8 w-8" />
          </div>
          <div className="p-2 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRightIcon className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-primary/10 group-hover:bg-primary transition-colors" />
    </Link>
  );
}