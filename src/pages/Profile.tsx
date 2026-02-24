import React from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../store/useStore';
import { Save } from 'lucide-react';

export default function Profile() {
  const { userProfile, updateProfile } = useStore();
  const { register, handleSubmit } = useForm({ defaultValues: userProfile });

  const onSubmit = (data: any) => {
    updateProfile({
      ...data,
      interests: typeof data.interests === 'string' ? data.interests.split(',').map((i: string) => i.trim()) : data.interests
    });
    alert('Profile saved to Scholira locally!');
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-3xl shadow-xl border border-indigo-50">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Academic Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input {...register("name")} placeholder="Full Name" className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" />
          <input {...register("major")} placeholder="Target Major" className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" />
          <input {...register("gpa")} placeholder="GPA (e.g. 3.9)" className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" />
          <input {...register("satScore")} placeholder="SAT Score" className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <textarea {...register("demographics")} placeholder="Background (e.g. First-gen student...)" className="w-full px-4 py-2 rounded-xl border border-slate-200 h-24 resize-none focus:ring-2 focus:ring-indigo-500" />
        <textarea {...register("achievements")} placeholder="Key Honors & Achievements" className="w-full px-4 py-2 rounded-xl border border-slate-200 h-24 resize-none focus:ring-2 focus:ring-indigo-500" />
        <input {...register("interests")} placeholder="Interests (Comma separated)" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg">
          <Save size={18} /> Save to Scholira
        </button>
      </form>
    </div>
  );
}
