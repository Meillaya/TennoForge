import React from 'react';
import { useForm } from 'react-hook-form';
import { Loader } from 'lucide-react';

interface BuildFormData {
  title: string;
  description: string;
  warframe: string;
  mods: string[];
  forma: number;
}

export default function BuildForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BuildFormData>();

  const onSubmit = async (data: BuildFormData) => {
    try {
      // API call will be implemented here
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-200">
          Build Title
        </label>
        <input
          id="title"
          type="text"
          {...register('title', { required: 'Title is required' })}
          className="input w-full mt-1"
        />
        {errors.title && (
          <p className="text-wf-accent text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-200">
          Description
        </label>
        <textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          className="input w-full mt-1 h-32"
        />
        {errors.description && (
          <p className="text-wf-accent text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="warframe" className="block text-sm font-medium text-gray-200">
          Warframe
        </label>
        <select
          id="warframe"
          {...register('warframe', { required: 'Warframe is required' })}
          className="input w-full mt-1"
        >
          <option value="">Select a Warframe</option>
          <option value="excalibur">Excalibur</option>
          <option value="volt">Volt</option>
          <option value="mag">Mag</option>
        </select>
        {errors.warframe && (
          <p className="text-wf-accent text-sm mt-1">{errors.warframe.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full flex items-center justify-center"
      >
        {isSubmitting ? (
          <Loader className="animate-spin h-5 w-5" />
        ) : (
          'Create Build'
        )}
      </button>
    </form>
  );
}