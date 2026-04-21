import { GlobalRegistrator } from '@happy-dom/global-registrator'

GlobalRegistrator.register()

// @ts-expect-error Vite define replacement not available in test
globalThis.__APP_VERSION__ = '0.0.0-test'
