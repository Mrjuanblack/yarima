"use client";

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  isOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
  itemClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  iconClassName?: string;
}

const Accordion = ({
  items,
  allowMultiple = false,
  className = "",
  itemClassName = "",
  headerClassName = "",
  contentClassName = "",
  iconClassName = ""
}: AccordionProps) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(items.filter(item => item.isOpen).map(item => item.id))
  );

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(itemId);
      }
      
      return newSet;
    });
  };

  const isItemOpen = (itemId: string) => openItems.has(itemId);

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      {items.map((item, index) => {
        const isOpen = isItemOpen(item.id);
        
        return (
          <div
            key={item.id}
            className={`rounded-lg shadow-xs ring-1 ring-black/5 overflow-hidden hover:shadow-md transition-shadow duration-200 ${itemClassName}`}
          >
            {/* Header */}
            <button
              className={`w-full px-6 py-4 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 transition-colors duration-200 flex items-center justify-between ${headerClassName}`}
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span className="text-lg font-semibold text-gray-900 pr-4">
                {item.title}
              </span>
              
              {/* Icon */}
              <motion.div
                className={`flex-shrink-0 w-6 h-6 flex items-center justify-center ${iconClassName}`}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <svg
                  className="w-5 h-5 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </button>

            {/* Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    ease: "easeInOut",
                    opacity: { duration: 0.2 }
                  }}
                  className="overflow-hidden"
                >
                  <div className={`px-6 py-4 bg-gray-50 border-t border-gray-100 ${contentClassName}`}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
