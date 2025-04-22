const safeEnv = process.env.NODE_ENV;

if (!['production', 'development', 'test'].includes(safeEnv)) {
  console.warn(
    '⚠️ NODE_ENV is non-standard:', safeEnv,
    '\nFalling back to production for safety.'
  );
  process.env.NODE_ENV = 'production';
}

console.log('✅ Active NODE_ENV:', process.env.NODE_ENV);

export const isProd = process.env.NODE_ENV === 'production';
