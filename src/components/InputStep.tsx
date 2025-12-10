import { motion } from "framer-motion";
import {
  ShoppingCart,
  Gift,
  FileText,
  RotateCcw,
  Ticket,
  Grid3x3,
  HeartHandshake,
  PackageOpen,
  Zap,
} from "lucide-react";

const COLLECTION_TYPES = [
  { id: "shop", label: "Online Shop", description: "Sell items online to optimize sales", icon: ShoppingCart },
  { id: "gifts", label: "Group Gifts", description: "Easily collect money for group gifts", icon: Gift },
  { id: "forms", label: "Forms", description: "Sign ups, forms, and waivers without payments", icon: FileText },
  { id: "recurring", label: "Recurring Payments", description: "Membership registration or subscription dues", icon: RotateCcw },
  { id: "tickets", label: "Event Tickets", description: "Sell tickets and accept payments", icon: Ticket, pro: true },
  { id: "custom", label: "Custom All-in-One", description: "Sell or collect anything (items, tickets, forms, etc.)", icon: Grid3x3, pro: true },
];

const FUNDRAISER_TYPES = [
  { id: "donations", label: "Flat Donations", description: "Supporters contribute a one-time donation", icon: HeartHandshake },
  { id: "sales", label: "Product Sales", description: "Supporters purchase from an online sales catalog", icon: PackageOpen },
  { id: "athon", label: 'Activity-based "Athon"', description: "Supporters pledge amount per participant activity", icon: Zap },
];

interface InputStepProps {
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
}

export function InputStep({ onSubmit, isLoading }: InputStepProps) {
  const handleSelect = (type: string) => {
    if (isLoading) return;
    onSubmit(type);
  };

  return (
    <div className="space-y-16">
      {/* ------------------- COLLECTION SECTION ------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-6">
          COLLECTION
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {COLLECTION_TYPES.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.label)}
              disabled={isLoading}
              className="
                group p-8 bg-white border border-neutral-200 
                rounded-xl text-left hover:shadow-lg
                transition-all duration-200 cursor-pointer disabled:opacity-50
                hover:border-neutral-300 hover:bg-neutral-50
              "
            >
              <item.icon className="w-10 h-10 text-orange-500 group-hover:text-orange-600 transition mb-5" />

              <h3 className="font-bold text-neutral-900 text-lg mb-3">{item.label}</h3>

              <p className="text-sm text-neutral-600 leading-relaxed mb-4">{item.description}</p>

              {item.pro && (
                <span className="text-xs bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full font-medium">
                  Pro plan
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ------------------- FUNDRAISER SECTION ------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            FUNDRAISER
          </h2>

          <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
            Learn more →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FUNDRAISER_TYPES.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.label)}
              disabled={isLoading}
              className="
                group p-8 bg-white border border-neutral-200 
                rounded-xl text-left hover:shadow-lg
                transition-all duration-200 cursor-pointer disabled:opacity-50
                hover:border-neutral-300 hover:bg-neutral-50
              "
            >
              <item.icon className="w-10 h-10 text-purple-500 group-hover:text-purple-600 transition mb-5" />

              <h3 className="font-bold text-neutral-900 text-lg mb-3">{item.label}</h3>

              <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
