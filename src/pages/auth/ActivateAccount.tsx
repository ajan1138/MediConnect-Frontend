import React from "react";
import { useAccountActivation } from "../../hooks/useAccountActivation";
import { TokenInput } from "../../components/forms/TokenInput";
import { Button } from "../../components/ui/Button";

const ActivateAccount: React.FC = () => {
  const {
    token,
    errors,
    isLoading,
    isResending,
    updateToken,
    activateAccount,
    resendActivationCode,
  } = useAccountActivation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await activateAccount();
  };

  const handleResendCode = () => {
    resendActivationCode();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      <div className="max-w-md w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-xl shadow-lg text-white space-y-6"
        >
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-green-400 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold mb-2">Check Your Email</h2>
            <p className="text-gray-300 mb-6">
              We've sent a 6-digit activation code to your email address. Please
              enter it below to activate your account.
            </p>
          </div>

          {errors.submit && (
            <div className="bg-red-500/10 border border-red-500 rounded-md p-3">
              <p className="text-red-400 text-sm">{errors.submit}</p>
            </div>
          )}

          <TokenInput
            value={token}
            onChange={updateToken}
            error={errors.token}
            disabled={isLoading}
          />

          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading || !token}
            className="w-full"
          >
            {isLoading ? "Activating Account..." : "Activate Account"}
          </Button>

          <div className="text-center border-t border-gray-600 pt-6">
            <p className="text-gray-400 mb-3">Didn't receive the code?</p>
            <Button
              type="button"
              variant="outline"
              onClick={handleResendCode}
              loading={isResending}
              disabled={isResending}
              className="w-full"
            >
              {isResending ? "Sending..." : "Resend Activation Code"}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Having trouble?{" "}
              <a
                href="/support"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Contact Support
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivateAccount;
