import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Calendar, Clock, User, Check, Sparkles, Phone, Mail, 
  Scissors, ShieldCheck, ChevronRight, ChevronLeft, Download, CheckCircle2 
} from 'lucide-react';
import { SERVICES_DATA, STYLISTS_DATA, SALON_DETAILS } from '../data/salonData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  preSelectedStylistId?: string;
}

export const InteractiveBookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
  preSelectedStylistId
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(preSelectedServiceId || 'jtr-full');
  const [selectedStylistId, setSelectedStylistId] = useState<string>(preSelectedStylistId || 'any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [addOns, setAddOns] = useState<string[]>([]);
  
  // Client details
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [hairLength, setHairLength] = useState<'short' | 'medium' | 'long' | 'extra-long'>('long');
  const [chemicalHistory, setChemicalHistory] = useState<string[]>([]);
  const [clientNotes, setClientNotes] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  useEffect(() => {
    if (preSelectedServiceId) setSelectedServiceId(preSelectedServiceId);
    if (preSelectedStylistId) setSelectedStylistId(preSelectedStylistId);
  }, [preSelectedServiceId, preSelectedStylistId]);

  // Set default date to next available weekday (Tue-Sat)
  useEffect(() => {
    const today = new Date();
    const target = new Date(today);
    target.setDate(today.getDate() + 2);
    // if Sunday (0), move to Tuesday (2)
    if (target.getDay() === 0) target.setDate(target.getDate() + 2);
    // if Monday (1), move to Tuesday (2)
    if (target.getDay() === 1) target.setDate(target.getDate() + 1);
    
    setSelectedDate(target.toISOString().split('T')[0]);
    setSelectedTimeSlot('10:30 AM');
  }, []);

  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:15 AM', '1:00 PM', 
    '2:30 PM', '3:15 PM', '4:45 PM', '5:30 PM'
  ];

  const chemicalOptions = [
    'Virgin Hair (No recent chemicals)',
    'Single-Process Hair Color / Root Touch-up',
    'Bleach / Lightener / Balayage',
    'Previous Japanese Straightening (JTR)',
    'Previous Perm or Keratin Treatment'
  ];

  const optionalAddons = [
    { id: 'milbon-seal', name: 'Milbon 5-Step Moisture & SSVR-Silk Booster', price: 65 },
    { id: 'scalp-exfoliation', name: 'Botanical Scalp Detox Scrub Pre-Treatment', price: 45 },
    { id: 'haircut-addon', name: 'Precision Ends Trim & Face-Framing Refresh', price: 65 }
  ];

  const currentService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];
  const currentStylist = STYLISTS_DATA.find(st => st.id === selectedStylistId);

  const calculateTotalEstimate = () => {
    let base = currentService.priceStartingAt;
    addOns.forEach(addonId => {
      const match = optionalAddons.find(a => a.id === addonId);
      if (match) base += match.price;
    });
    return base;
  };

  const handleToggleAddon = (id: string) => {
    if (addOns.includes(id)) {
      setAddOns(addOns.filter(a => a !== id));
    } else {
      setAddOns([...addOns, id]);
    }
  };

  const handleToggleChem = (opt: string) => {
    if (chemicalHistory.includes(opt)) {
      setChemicalHistory(chemicalHistory.filter(c => c !== opt));
    } else {
      setChemicalHistory([...chemicalHistory, opt]);
    }
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      alert('Please fill in your name, email, and phone number.');
      return;
    }
    const code = `JNK-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationCode(code);
    setIsConfirmed(true);
  };

  const generateIcsFile = () => {
    const title = `${currentService.name} - Junko Hair Studio`;
    const desc = `Appointment at Junko Hair Studio with ${currentStylist ? currentStylist.name : 'Master Stylist'}. Address: 2391 Peachtree Rd NE, Suite B3D, Atlanta GA 30305. Phone: (404) 814-1827.`;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Junko Hair Studio//EN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${desc}
LOCATION:2391 Peachtree Rd NE, Suite B3D, Atlanta, GA 30305
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `JunkoHair_Appointment_${confirmationCode || 'Booking'}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetModal = () => {
    setIsConfirmed(false);
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="bg-[#171513] border border-[#3E3A34] rounded-lg max-w-3xl w-full p-5 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] flex flex-col justify-between overflow-y-auto"
      >
        <button
          onClick={handleResetModal}
          className="absolute top-4 right-4 text-[#8C847A] hover:text-[#F3EFEA] p-2 text-xl cursor-pointer z-10"
        >
          ✕
        </button>

        {/* Confirmation Screen */}
        {isConfirmed ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6 sm:py-8 space-y-6"
          >
            <div className="w-16 h-16 bg-[#C5A880]/15 text-[#C5A880] rounded-full mx-auto flex items-center justify-center border border-[#C5A880]/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block mb-1">
                Reservation Confirmed
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F3EFEA] font-light">
                We Look Forward to Welcoming You
              </h2>
              <p className="text-xs sm:text-sm text-[#A89F93] font-light max-w-md mx-auto mt-2">
                Your reservation request has been registered. Our salon concierge will send a confirmation SMS and preparation guide.
              </p>
            </div>

            {/* Ticket Card */}
            <div className="bg-[#1F1D1A] border border-[#3A3630] rounded-sm p-5 text-left max-w-md mx-auto text-xs space-y-3 shadow-xl">
              <div className="flex justify-between items-center border-b border-[#2C2925] pb-2">
                <span className="text-[#8C847A] uppercase tracking-wider text-[10px]">Reference Code</span>
                <span className="font-mono text-sm font-semibold text-[#C5A880]">{confirmationCode}</span>
              </div>
              <div>
                <span className="text-[#8C847A] uppercase tracking-wider text-[10px] block">Service</span>
                <span className="text-[#F3EFEA] font-medium text-sm">{currentService.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[#8C847A] uppercase tracking-wider text-[10px] block">Master Stylist</span>
                  <span className="text-[#EAE4DC] font-medium">{currentStylist ? currentStylist.name : 'Any Available Specialist'}</span>
                </div>
                <div>
                  <span className="text-[#8C847A] uppercase tracking-wider text-[10px] block">Date & Time</span>
                  <span className="text-[#EAE4DC] font-medium">{selectedDate} @ {selectedTimeSlot}</span>
                </div>
              </div>
              <div className="border-t border-[#2C2925] pt-2 text-[11px] text-[#8C847A]">
                Location: 2391 Peachtree Rd NE, Suite B3D, Atlanta, GA 30305
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                onClick={generateIcsFile}
                className="py-3 px-5 bg-[#C5A880] hover:bg-[#D5BCA0] text-[#121110] text-xs uppercase tracking-widest font-semibold rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Add to Apple / Google Calendar</span>
              </button>
              <button
                onClick={handleResetModal}
                className="py-3 px-5 border border-[#3E3A34] hover:border-[#C5A880] text-xs uppercase tracking-wider text-[#D4CAC0] rounded-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        ) : (
          /* Multi-Step Flow */
          <div>
            {/* Step Header */}
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                Step {step} of 4 • Concierge Reservation
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F3EFEA] font-light mt-0.5">
                {step === 1 && "Select Service & Custom Add-ons"}
                {step === 2 && "Choose Master Stylist"}
                {step === 3 && "Select Preferred Date & Timing"}
                {step === 4 && "Hair Profile & Contact Information"}
              </h2>
            </div>

            {/* Stepper Indicator */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    s <= step ? 'bg-[#C5A880]' : 'bg-[#292623]'
                  }`}
                />
              ))}
            </div>

            {/* Step 1: Select Service & Add-ons */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#A89F93] block mb-2 font-medium">
                    Primary Treatment:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                    {SERVICES_DATA.map((srv) => (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => setSelectedServiceId(srv.id)}
                        className={`p-3 text-left rounded-sm border transition-all duration-200 cursor-pointer ${
                          selectedServiceId === srv.id
                            ? 'bg-[#221F1B] border-[#C5A880] text-[#F3EFEA]'
                            : 'bg-[#1A1816] border-[#2C2925] text-[#9E9589] hover:text-[#EAE4DC] hover:border-[#3E3A34]'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-1">
                          <span className="text-xs font-medium text-[#F3EFEA]">{srv.name}</span>
                          <span className="text-xs font-semibold text-[#C5A880] shrink-0">${srv.priceStartingAt}+</span>
                        </div>
                        <span className="text-[10px] text-[#8C847A] block mt-1">{srv.durationMinutes} min • {srv.tag || srv.category}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="text-xs uppercase tracking-wider text-[#A89F93] block mb-2 font-medium">
                    Optional Japanese Restorative Add-ons:
                  </label>
                  <div className="space-y-2">
                    {optionalAddons.map((add) => (
                      <div
                        key={add.id}
                        onClick={() => handleToggleAddon(add.id)}
                        className={`p-3 rounded-sm border flex items-center justify-between cursor-pointer transition-colors ${
                          addOns.includes(add.id)
                            ? 'bg-[#221F1B] border-[#C5A880]'
                            : 'bg-[#191715] border-[#2B2824] hover:border-[#38342F]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                            addOns.includes(add.id) ? 'bg-[#C5A880] border-[#C5A880] text-[#121110]' : 'border-[#443F39]'
                          }`}>
                            {addOns.includes(add.id) && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs text-[#EAE4DC]">{add.name}</span>
                        </div>
                        <span className="text-xs text-[#C5A880] font-medium">+${add.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Choose Stylist */}
            {step === 2 && (
              <div className="space-y-3">
                <p className="text-xs text-[#9E9589] font-light">
                  Select your preferred artisan or choose any available master technician for earliest scheduling.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                  <button
                    type="button"
                    onClick={() => setSelectedStylistId('any')}
                    className={`p-4 text-left rounded-sm border transition-all cursor-pointer ${
                      selectedStylistId === 'any'
                        ? 'bg-[#221F1B] border-[#C5A880] text-[#F3EFEA]'
                        : 'bg-[#1A1816] border-[#2C2925] text-[#9E9589] hover:border-[#3E3A34]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#2A2723] flex items-center justify-center text-[#C5A880]">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#F3EFEA]">Any Available Master Stylist</h4>
                        <span className="text-[10px] text-[#8C847A]">Earliest opening with certified team</span>
                      </div>
                    </div>
                  </button>

                  {STYLISTS_DATA.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSelectedStylistId(st.id)}
                      className={`p-4 text-left rounded-sm border transition-all cursor-pointer ${
                        selectedStylistId === st.id
                          ? 'bg-[#221F1B] border-[#C5A880] text-[#F3EFEA]'
                          : 'bg-[#1A1816] border-[#2C2925] text-[#9E9589] hover:border-[#3E3A34]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={st.image}
                          alt={st.name}
                          className="w-10 h-10 rounded-full object-cover object-top border border-[#3E3A34]"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-xs font-semibold text-[#F3EFEA]">{st.name}</h4>
                          <span className="text-[10px] text-[#C5A880]">{st.title.split('&')[0]}</span>
                          <span className="text-[10px] text-[#8C847A] block">{st.experienceYears}+ yrs exp</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Date & Time Slot */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#A89F93] block mb-2 font-medium">
                    Select Preferred Date (Tuesday – Saturday):
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 bg-[#1A1816] border border-[#2E2B27] rounded-sm text-xs text-[#F3EFEA] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#A89F93] block mb-2 font-medium">
                    Available Time Slots:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-3 text-center text-xs uppercase tracking-wider rounded-sm border transition-all cursor-pointer ${
                          selectedTimeSlot === slot
                            ? 'bg-[#C5A880] text-[#121110] font-semibold border-[#C5A880]'
                            : 'bg-[#1A1816] border-[#2C2925] text-[#9E9589] hover:text-[#F3EFEA] hover:border-[#3E3A34]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-[#1D1B18] border border-[#2D2A26] rounded-sm text-xs text-[#8C847A] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>Appointments are carefully buffered to ensure unhurried, private craftsmanship.</span>
                </div>
              </div>
            )}

            {/* Step 4: Hair Profile & Contact */}
            {step === 4 && (
              <form onSubmit={handleCompleteBooking} className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#A89F93] block mb-1.5 font-medium">
                    Current Hair Length:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['short', 'medium', 'long', 'extra-long'] as const).map((len) => (
                      <button
                        key={len}
                        type="button"
                        onClick={() => setHairLength(len)}
                        className={`py-2 text-center text-[11px] uppercase tracking-wider rounded-sm border transition-colors cursor-pointer ${
                          hairLength === len
                            ? 'bg-[#C5A880] text-[#121110] font-semibold border-[#C5A880]'
                            : 'bg-[#1A1816] border-[#2C2925] text-[#9E9589]'
                        }`}
                      >
                        {len.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#A89F93] block mb-1.5 font-medium">
                    Chemical History (Past 12 Months):
                  </label>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {chemicalOptions.map((opt, i) => (
                      <div
                        key={i}
                        onClick={() => handleToggleChem(opt)}
                        className="flex items-center gap-2 text-xs text-[#D8D0C5] p-2 bg-[#1A1816] rounded-sm border border-[#2B2824] cursor-pointer hover:border-[#38342F]"
                      >
                        <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                          chemicalHistory.includes(opt) ? 'bg-[#C5A880] border-[#C5A880] text-[#121110]' : 'border-[#443F39]'
                        }`}>
                          {chemicalHistory.includes(opt) && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A89F93] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full p-2.5 bg-[#1A1816] border border-[#2E2B27] rounded-sm text-xs text-[#F3EFEA] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A89F93] block mb-1">
                      Phone (SMS Confirmation) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(404) 555-0199"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full p-2.5 bg-[#1A1816] border border-[#2E2B27] rounded-sm text-xs text-[#F3EFEA] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#A89F93] block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="eleanor@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full p-2.5 bg-[#1A1816] border border-[#2E2B27] rounded-sm text-xs text-[#F3EFEA] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#A89F93] block mb-1">
                    Specific Requests or Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about your previous straightening experiences, allergies, or concerns..."
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="w-full p-2.5 bg-[#1A1816] border border-[#2E2B27] rounded-sm text-xs text-[#F3EFEA] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                {/* Estimate Box */}
                <div className="p-3 bg-[#1F1D1A] border border-[#3E3A34] rounded-sm flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#8C847A] block">Estimated Base Investment:</span>
                    <span className="text-[#F3EFEA] font-medium">{currentService.name}</span>
                  </div>
                  <span className="font-serif text-xl text-[#C5A880] font-light">
                    ~${calculateTotalEstimate()}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C5A880] hover:bg-[#D5BCA0] text-[#121110] text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow-lg cursor-pointer mt-2"
                >
                  Confirm & Reserve Appointment
                </button>
              </form>
            )}

            {/* Stepper Navigation Buttons (Steps 1-3) */}
            {step < 4 && (
              <div className="mt-8 pt-4 border-t border-[#2A2723] flex justify-between items-center">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 border border-[#332F2A] hover:border-[#C5A880] text-xs text-[#A89F93] hover:text-[#F3EFEA] rounded-sm flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 bg-[#C5A880] hover:bg-[#D5BCA0] text-[#121110] text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

      </motion.div>
    </div>
  );
};
