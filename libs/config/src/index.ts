import dotenv from 'dotenv'
import { resolve } from 'path'
import { cleanEnv, str } from 'envalid'

try {
    dotenv.config({ path: resolve(process.cwd(), '.env') })
} catch {}

const config = cleanEnv(process.env, {
    POSTGRES_USER: str({default: 'postgres'}),
    POSTGRES_PASSWORD: str({default: 'postgres'}),
    POSTGRES_DB: str({default: 'telman'}),
    POSTGRES_HOST: str({default: 'postgres'}),
    POSTGRES_PORT: str({default: '5432'}),
    USERS_QUEUE: str({ default: 'USERS_QUEUE' }),
    DOPPLER_TOKEN: str()
})

export default config
