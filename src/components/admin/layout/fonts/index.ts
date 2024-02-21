import { MuseoModerno } from 'next/font/google'

const museo = MuseoModerno({
  weight: ['300', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

const museoClassName = museo.className;

export default museoClassName;