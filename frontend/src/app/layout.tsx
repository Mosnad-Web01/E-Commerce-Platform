import 'src/global.css';

// ----------------------------------------------------------------------

import type { Viewport } from 'next';

import { getServerSession } from 'next-auth';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import { CONFIG } from 'src/config-global';
import { primary } from 'src/theme/core/palette';
import { LocalizationProvider } from 'src/locales';
import { detectLanguage } from 'src/locales/server';
import { schemeConfig } from 'src/theme/scheme-config';
import { I18nProvider } from 'src/locales/i18n-provider';
import { ThemeProvider } from 'src/theme/theme-provider';

import { Snackbar } from 'src/components/snackbar';
import { ProgressBar } from 'src/components/progress-bar';
import SessionProvider from 'src/components/SessionProvider';
import QueryProvider from 'src/components/QueryClientProvider';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { CheckoutProvider } from 'src/sections/checkout/context';

import { AuthProvider as JwtAuthProvider } from 'src/auth/context/jwt';
import { AuthProvider as Auth0AuthProvider } from 'src/auth/context/auth0';
import { AuthProvider as AmplifyAuthProvider } from 'src/auth/context/amplify';
import { AuthProvider as SupabaseAuthProvider } from 'src/auth/context/supabase';
import { AuthProvider as FirebaseAuthProvider } from 'src/auth/context/firebase';
import { MainLayout } from 'src/layouts/main';

// ----------------------------------------------------------------------

const AuthProvider =
  (CONFIG.auth.method === 'amplify' && AmplifyAuthProvider) ||
  (CONFIG.auth.method === 'firebase' && FirebaseAuthProvider) ||
  (CONFIG.auth.method === 'supabase' && SupabaseAuthProvider) ||
  (CONFIG.auth.method === 'auth0' && Auth0AuthProvider) ||
  JwtAuthProvider;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primary.main,
};

export const metadata = {
  icons: [
    {
      rel: 'icon',
      url: `${CONFIG.assetsDir}/favicon.ico`,
    },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();

  const session = await getServerSession();

  return (
    <html lang={lang ?? 'en'} suppressHydrationWarning>
      <body>
        <SessionProvider session={session}>
          <QueryProvider>
            <InitColorSchemeScript
              defaultMode={schemeConfig.defaultMode}
              modeStorageKey={schemeConfig.modeStorageKey}
            />

            <I18nProvider lang={CONFIG.isStaticExport ? undefined : lang}>
              <LocalizationProvider>
                <AuthProvider>
                  <SettingsProvider settings={defaultSettings}>
                    <ThemeProvider>
                      <MotionLazy>
                        <CheckoutProvider>
                          <Snackbar />
                          <ProgressBar />
                          <SettingsDrawer />
                          {children}
                        </CheckoutProvider>
                      </MotionLazy>
                    </ThemeProvider>
                  </SettingsProvider>
                </AuthProvider>
              </LocalizationProvider>
            </I18nProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
