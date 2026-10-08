// Import names that differ from the package name that provides them. Public-safe names only.
// Dotted prefixes are matched longest first, then the generic dash-joined fallback applies.
export const PYTHON_IMPORT_ALIASES = {
  bs4: 'beautifulsoup4',
  cv2: 'opencv-python',
  docx: 'python-docx',
  dotenv: 'python-dotenv',
  fitz: 'pymupdf',
  git: 'gitpython',
  google_auth_oauthlib: 'google-auth-oauthlib',
  googleapiclient: 'google-api-python-client',
  'google.auth': 'google-auth',
  'google.oauth2': 'google-auth',
  jose: 'python-jose',
  jwt: 'pyjwt',
  multipart: 'python-multipart',
  PIL: 'pillow',
  psycopg2: 'psycopg2-binary',
  sklearn: 'scikit-learn',
  yaml: 'pyyaml'
};

export function normalizePythonName(name) {
  return name.toLowerCase().replace(/[._]+/g, '-');
}
