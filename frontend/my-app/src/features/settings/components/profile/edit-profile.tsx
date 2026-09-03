import {
  Phone,
  User,
  MailIcon,
  ImagePlus,
  Edit3,
  DeleteIcon,
} from 'lucide-react';
import { useEditProfile } from '@/features/settings/hooks/useEditProfile';
import { EditProfileData } from '../../schema/edit-profile';
import { Button } from '@/components/ui/button';

interface EditProfileProps {
  onClose?: () => void;
}

export default function EditProfile({ onClose }: EditProfileProps) {
  const {
    handleSubmit,
    register,
    formate: { errors },
  } = useEditProfile();

  function editProfile(data: EditProfileData) {
    console.log(data);
    console.log(data.image)
  }

  return (
    <form
      onSubmit={handleSubmit(editProfile, (formErrors) => console.log(formErrors))}
      className="lg:grid lg:grid-cols-2 p-3 lg:gap-3 lg:items-center flex flex-col gap-2 "
    >
      <div>
        <label
          htmlFor="image"
          className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:border-gray-400"
        >
          <ImagePlus className="mb-3 h-12 w-12 text-gray-400" />

          <p className="text-sm text-gray-500">
            Clique para selecionar uma imagem
          </p>

          <input
            id="image"
            type="file"
            accept="image/*"
            className="hidden"
            {...register('image')}
          />
        </label>
        {errors.image && (
          <span className="text-sm text-red-600">{errors.image.message}</span>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-gray-900">Nome</label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-900" />
          <input
            className="w-full pl-10 pr-4 py-2  bg-gray-100 border border-gray-400 text-gray-900 rounded-md outline-none transition-all placeholder:text-gray-900"
            type="text"
            placeholder="Nome de usuário"
            {...register('name')}
          />
        </div>
        {errors.name && (
          <span className="text-sm text-red-600">{errors.name.message}</span>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-gray-900">Email</label>
        <div className="relative">
          <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5  text-gray-900" />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-400 text-gray-900 rounded-md outline-none transition-all placeholder:text-gray-900"
            {...register('email')}
          />
        </div>
        {errors.email && (
          <span className="text-sm text-red-600">{errors.email.message}</span>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-gray-900">Telefone</label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-900" />
          <input
            type="tel"
            placeholder="Número de celular"
            className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-400 text-gray-900 rounded-md outline-none transition-all placeholder:text-gray-900"
            {...register('phone')}
          />
        </div>
        {errors.phone && (
          <span className="text-sm text-red-600">{errors.phone.message}</span>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-gray-900">
          <label className="text-gray-900">Gênero</label>
          <select
            className="w-full p-3 bg-gray-100 border border-gray-400 text-gray-900 rounded-md outline-none transition-all"
            {...register('gender')}
          >
            <option value="" >
              Seleccione um género
            </option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
          {errors.gender && (
            <span className="text-sm text-red-600">{errors.gender.message}</span>
          )}
        </div>
      </div>

      <div className="flex gap-4 items-center justify-end">
        <Button
        type='button'
          className={`bg-red-400 text-white hover:bg-red-600 rounded-sm p-1 text-sm flex gap-1 items-center `}
          onClick={onClose}
        >
          <DeleteIcon className="w-4 h-4" />
          cancelar
        </Button>

        <Button
          type="submit"

          className={`bg-emerald-600 text-gray-100 hover:bg-emerald-400 rounded-sm p-1 w-20 text-sm flex gap-1 items-center `}
        >
          {' '}
          <Edit3 className="w-4 h-4" />
          Editar
        </Button>
      </div>
    </form>
  );
}
