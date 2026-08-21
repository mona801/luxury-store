export function VisaIcon({ className = "h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="50" rx="6" fill="#1A1F71"/>
      <text x="40" y="32" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Arial, sans-serif">VISA</text>
    </svg>
  );
}

export function MastercardIcon({ className = "h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="50" rx="6" fill="#252525"/>
      <circle cx="32" cy="25" r="14" fill="#EB001B"/>
      <circle cx="48" cy="25" r="14" fill="#F79E1B"/>
    </svg>
  );
}

export function MadaIcon({ className = "h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="50" rx="6" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
      <rect x="15" y="12" width="10" height="26" rx="2" fill="#00A651"/>
      <rect x="28" y="12" width="10" height="26" rx="2" fill="#0066B3"/>
      <circle cx="55" cy="25" r="12" fill="none" stroke="#00A651" strokeWidth="3"/>
      <circle cx="50" cy="25" r="12" fill="none" stroke="#0066B3" strokeWidth="3"/>
    </svg>
  );
}

export function TabbyIcon({ className = "h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="50" rx="6" fill="#FFC6D9"/>
      <text x="40" y="33" textAnchor="middle" fill="#1C1C1C" fontSize="26" fontWeight="bold" fontFamily="Arial, sans-serif">t</text>
    </svg>
  );
}

export function TamaraIcon({ className = "h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="50" rx="6" fill="#34CEFF"/>
      <text x="40" y="33" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Arial, sans-serif">T</text>
    </svg>
  );
}

export function CodIcon({ className = "h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 50" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="50" rx="6" fill="#F59E0B"/>
      <text x="40" y="32" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">COD</text>
    </svg>
  );
}

export const PAYMENT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  visa: VisaIcon,
  mastercard: MastercardIcon,
  mada: MadaIcon,
  tabby: TabbyIcon,
  tamara: TamaraIcon,
  cod: CodIcon,
};
