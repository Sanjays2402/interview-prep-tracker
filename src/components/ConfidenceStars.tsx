import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Props {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
  readonly?: boolean;
}

export default function ConfidenceStars({ value, onChange, size = 18, readonly = false }: Props) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <motion.button
          key={i}
          onClick={() => !readonly && onChange?.(i)}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer'} focus:outline-none`}
          whileHover={!readonly ? { scale: 1.2 } : undefined}
          whileTap={!readonly ? { scale: 0.9 } : undefined}
        >
          <motion.div
            initial={false}
            animate={{
              scale: i <= value ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <Star
              size={size}
              className={i <= value ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'}
            />
          </motion.div>
        </motion.button>
      ))}
    </div>
  );
}
