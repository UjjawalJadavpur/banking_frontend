import AuthForm from "./component/AuthForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 bg-gradient-to-br from-blue-100 via-white to-blue-50">
      {/* Logo & Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 tracking-tight drop-shadow-lg">
          BankSecure
        </h1>
        <p className="text-gray-600 text-sm mt-2">
          Secure. Reliable. Banking made simple.
        </p>
      </div>

      {/* Card for Auth Form */}
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md border border-blue-100">
        <AuthForm />
      </div>

      {/* Footer */}
      <div className="mt-8 text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} BankSecure. All Rights Reserved.
      </div>
    </div>
  );
}