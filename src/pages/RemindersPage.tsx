import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Clock, Bell, Trash2, Edit, Calendar, Pill, AlertCircle, CheckCircle, X, Repeat2 } from 'lucide-react';

interface Reminder {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate: string;
  notes: string;
  isActive: boolean;
}

const RemindersPage: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [formData, setFormData] = useState({
    medicineName: '',
    dosage: '',
    frequency: 'daily',
    times: ['09:00'],
    startDate: '',
    endDate: '',
    notes: ''
  });

  useEffect(() => {
    const savedReminders = localStorage.getItem('medicineReminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }

    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, startDate: today }));
  }, []);

  useEffect(() => {
    localStorage.setItem('medicineReminders', JSON.stringify(reminders));
  }, [reminders]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTimeChange = (index: number, value: string) => {
    const newTimes = [...formData.times];
    newTimes[index] = value;
    // FIX: Use localeCompare for correct chronological time sorting (10:00 > 09:00)
    newTimes.sort((a, b) => a.localeCompare(b));
    setFormData(prev => ({
      ...prev,
      times: newTimes
    }));
  };

  const addTimeSlot = () => {
    const lastTime = formData.times[formData.times.length - 1];
    const [lastHour, lastMinute] = lastTime.split(':').map(Number);
    
    let newHour = lastHour + 1;
    if (newHour >= 24) newHour -= 24;
    const suggestedTime = `${String(newHour).padStart(2, '0')}:${String(lastMinute).padStart(2, '0')}`;

    setFormData(prev => ({
      ...prev,
      times: [...prev.times, suggestedTime].sort((a, b) => a.localeCompare(b))
    }));
  };

  const removeTimeSlot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      times: prev.times.filter((_, i) => i !== index)
    }));
  };
  
  const resetForm = () => {
    const today = new Date().toISOString().split('T')[0];
    setFormData({
      medicineName: '',
      dosage: '',
      frequency: 'daily',
      times: ['09:00'],
      startDate: today,
      endDate: '',
      notes: ''
    });
    setEditingReminder(null);
    setShowAddForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sortedTimes = [...formData.times].sort((a, b) => a.localeCompare(b));

    const newReminder: Reminder = {
      id: editingReminder ? editingReminder.id : Date.now().toString(),
      medicineName: formData.medicineName,
      dosage: formData.dosage,
      frequency: formData.frequency,
      times: sortedTimes,
      startDate: formData.startDate,
      endDate: formData.endDate,
      notes: formData.notes,
      isActive: true
    };

    if (editingReminder) {
      setReminders(prev => prev.map(r => r.id === editingReminder.id ? newReminder : r));
    } else {
      setReminders(prev => [...prev, newReminder]);
    }

    resetForm();

    scheduleNotifications(newReminder); 
  };

  const scheduleNotifications = (reminder: Reminder) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      
      reminder.times.forEach(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const now = new Date();
        let notificationTime = new Date();
        notificationTime.setHours(hours, minutes, 0, 0);

        if (notificationTime <= now) {
          notificationTime.setDate(notificationTime.getDate() + 1);
        }
        
        const timeUntilNotification = notificationTime.getTime() - now.getTime();
        setTimeout(() => {
          new Notification(`Medication Time: ${reminder.medicineName}`, {
            body: `Don't forget your ${reminder.dosage} dose. ${reminder.notes ? `Note: ${reminder.notes}` : ''}`,
            icon: '/pill-icon.png'
          });
        }, timeUntilNotification);
      });
    }
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => 
      r.id === id ? { ...r, isActive: !r.isActive } : r
    ));
  };

  const editReminder = (reminder: Reminder) => {
    setEditingReminder(reminder);
    setFormData({
      medicineName: reminder.medicineName,
      dosage: reminder.dosage,
      frequency: reminder.frequency,
      times: reminder.times,
      startDate: reminder.startDate,
      endDate: reminder.endDate,
      notes: reminder.notes
    });
    setShowAddForm(true);
  };
  
  const getFrequencyText = (frequency: string) => {
      switch(frequency) {
          case 'daily': return 'Once a Day';
          case 'twice-daily': return 'Twice a Day';
          case 'three-times': return 'Three Times a Day';
          case 'weekly': return 'Once a Week';
          default: return 'Custom';
      }
  }

  const isReminderOverdue = (reminder: Reminder): boolean => {
      if (!reminder.endDate) return false;
      const today = new Date().toISOString().split('T')[0];
      return reminder.endDate < today && reminder.isActive;
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50/30 py-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl"></div>
        </div>
        
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 group bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Home</span>
          </Link>

          <button
            onClick={() => {
                resetForm(); 
                setShowAddForm(true);
            }}
            className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-4 w-4" />
            <span>Add Reminder</span>
          </button>
        </div>

        <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-primary-400 rounded-full blur-2xl opacity-30"></div>
                <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 p-5 rounded-full shadow-2xl">
                    <Bell className="h-10 w-10 text-white" />
                </div>
            </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-3">
            Your Dose Alarms
          </h1>
          
          <p className="text-lg text-primary-600 max-w-3xl mx-auto">
            Stay on track with your medication schedule. We'll remind you exactly when it's time to take your pills.
          </p>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 z-50 bg-primary-900 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-3xl w-full max-w-xl max-h-[95vh] overflow-y-auto p-4 sm:p-6 lg:p-8 border-4 border-primary-100 animate-fade-in-up">
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary-900">
                  {editingReminder ? 'Edit Reminder' : 'Add New Reminder'}
                </h2>
                <button 
                    onClick={resetForm}
                    className="text-primary-400 hover:text-primary-600 p-2 rounded-full transition"
                >
                    <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                        <Pill className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
                        <input
                            type="text"
                            name="medicineName"
                            required
                            value={formData.medicineName}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-3 py-3 border border-primary-300 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all font-medium"
                            placeholder="Medicine Name *"
                        />
                    </div>

                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl text-primary-400 font-bold leading-none">#</span>
                        <input
                            type="text"
                            name="dosage"
                            required
                            value={formData.dosage}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-3 py-3 border border-primary-300 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all font-medium"
                            placeholder="Dosage (e.g., 1 tablet)"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-primary-700 mb-2 flex items-center space-x-2">
                        <Repeat2 className='h-4 w-4' />
                        <span>Frequency *</span>
                    </label>
                    <select
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-primary-300 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all appearance-none bg-white font-medium"
                    >
                        <option value="daily">Daily</option>
                        <option value="twice-daily">Twice Daily (BID)</option>
                        <option value="three-times">Three Times Daily (TID)</option>
                        <option value="weekly">Weekly</option>
                    </select>
                </div>
                <div className="bg-primary-50 p-4 rounded-xl border border-primary-200">
                    <label className="block text-sm font-semibold text-primary-700 mb-3 flex items-center space-x-2">
                        <Clock className='h-4 w-4' />
                        <span>Reminder Times *</span>
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {formData.times.map((time, index) => (
                            <div key={index} className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm border border-primary-200">
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => handleTimeChange(index, e.target.value)}
                                    className="p-1 border-none focus:ring-0 rounded-md font-mono text-lg text-primary-800"
                                />
                                {formData.times.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeTimeSlot(index)}
                                        className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-100 transition"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addTimeSlot}
                            className="bg-primary-200 text-primary-700 px-3 py-2 rounded-lg font-medium hover:bg-primary-300 transition-all flex items-center space-x-1 border border-primary-300 shadow-sm"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Add Time</span>
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-primary-700 mb-2 flex items-center space-x-2">
                            <Calendar className='h-4 w-4' />
                            <span>Start Date *</span>
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            required
                            value={formData.startDate}
                            onChange={handleInputChange}
                            className="w-full px-3 py-3 border border-primary-300 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all font-medium"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-primary-700 mb-2 flex items-center space-x-2">
                            <Calendar className='h-4 w-4' />
                            <span>End Date (Optional)</span>
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            className="w-full px-3 py-3 border border-primary-300 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all font-medium"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-primary-700 mb-2">
                        Notes
                    </label>
                    <textarea
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-primary-300 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all font-medium"
                        placeholder="e.g., Take with food, or before bed..."
                    />
                </div>

                <div className="flex space-x-4 pt-4 justify-end">
                    <button
                        type="button"
                        onClick={resetForm}
                        className="bg-primary-300 text-primary-700 px-6 py-3 rounded-xl font-semibold hover:bg-primary-400 transition-all shadow-md"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-300/50"
                    >
                        {editingReminder ? 'Save Changes' : 'Create Reminder'}
                    </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {reminders.length === 0 ? (
            <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-primary-100">
              <Pill className="h-16 w-16 text-primary-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary-900 mb-2">No active reminders</h3>
              <p className="text-primary-600">Click "Add Reminder" to set up your first dose alarm. 🔔</p>
            </div>
          ) : (
            reminders.map((reminder) => (
              <div 
                key={reminder.id} 
                className={`bg-white/90 backdrop-blur-sm rounded-3xl p-6 border-l-8 transition-all duration-300 ${
                    isReminderOverdue(reminder) ? 'border-red-500 shadow-xl ring-2 ring-red-100' :
                    reminder.isActive ? 'border-primary-500 shadow-xl hover:shadow-2xl' : 
                    'border-primary-300 shadow-md hover:shadow-lg opacity-70'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className={`text-2xl font-bold ${reminder.isActive ? 'text-primary-900' : 'text-primary-500 line-through'}`}>{reminder.medicineName}</h3>
                      
                      {isReminderOverdue(reminder) && (
                          <span className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold text-white bg-red-500">
                            <AlertCircle className="h-3 w-3" />
                            <span>OVERDUE</span>
                          </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        reminder.isActive 
                          ? 'bg-primary-100 text-primary-800' 
                          : 'bg-primary-100 text-primary-600'
                      }`}>
                        {reminder.isActive ? 'Active' : 'Paused'}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-y-3 gap-x-4 text-sm text-primary-600 mb-3">
                        <div className="flex items-center space-x-2">
                            <Pill className="h-4 w-4 text-primary-500" />
                            <span className="font-medium text-primary-800">{reminder.dosage}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Repeat2 className="h-4 w-4 text-primary-500" />
                            <span className="font-medium">{getFrequencyText(reminder.frequency)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-primary-500" />
                            <span className="font-medium">{reminder.startDate} {reminder.endDate ? `to ${reminder.endDate}` : '(Ongoing)'}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                        {reminder.times.map(time => (
                            <span key={time} className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary-200 text-primary-800">
                                <Clock className="h-3 w-3" />
                                <span>{time}</span>
                            </span>
                        ))}
                    </div>
                    
                    {reminder.notes && (
                      <p className="text-sm italic text-primary-600 mt-2 border-l-2 pl-2 border-primary-200">"{reminder.notes}"</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-6 shrink-0">
                    <button
                      onClick={() => toggleReminder(reminder.id)}
                      title={reminder.isActive ? 'Pause Reminder' : 'Activate Reminder'}
                      className={`p-3 rounded-full transition-all duration-200 shadow-md ${
                        reminder.isActive 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                          : 'bg-primary-100 text-primary-500 hover:bg-primary-200'
                      }`}
                    >
                      {reminder.isActive ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={() => editReminder(reminder)}
                      title="Edit Reminder"
                      className="p-3 bg-primary-100 text-primary-600 hover:bg-primary-200 rounded-full transition-all duration-200 shadow-md"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      title="Delete Reminder"
                      className="p-3 bg-red-100 text-red-600 hover:bg-red-200 rounded-full transition-all duration-200 shadow-md"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RemindersPage;