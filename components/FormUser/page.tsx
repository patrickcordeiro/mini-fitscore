import { UserIcon } from "lucide-react";

interface FormUserProps {
  formData: {
    name: string;
    email: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
    }>
  >;
}

export default function FormUser({ formData, setFormData }: FormUserProps) {
  return (
    <div className="flex flex-col gap-10 w-11/12 bg-[#F8FAFC] p-10  border-l-4 rounded-lg border-[#1A56DB]">
      <div className="flex items-center gap-2">
        <UserIcon />
        <h3 className="text-[#1A56DB] text-2xl font-bold">
          Identificação do Candidato
        </h3>
      </div>

      <div className="flex flex-col gap-5">
        <label htmlFor="name" className="font-semibold text-[#334155]">
          Nome Completo
        </label>
        <input
          type="text"
          id="name"
          className="border border-gray-300 p-2 rounded-md"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      <div className="flex flex-col gap-5">
        <label htmlFor="email" className="font-semibold text-[#334155]">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          className="border border-gray-300 p-2 rounded-md"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>
    </div>
  );
}
