
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// CoinCart custom colors
				neon: {
					purple: '#9b87f5',
					blue: '#1EAEDB', 
					cyan: '#00FFFF',
				},
				cyber: {
					dark: '#1A1F2C',
					purple: '#8B5CF6',
					orange: '#F97316',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 5px 0px rgba(155, 135, 245, 0.7)' },
					'50%': { boxShadow: '0 0 20px 5px rgba(155, 135, 245, 0.9)' }
				},
				'coin-bounce': {
					'0%, 100%': { transform: 'translateY(0) scale(1)' },
					'50%': { transform: 'translateY(-20px) scale(1.1)' }
				},
				'rotate-coin': {
					'0%': { transform: 'rotateY(0deg)' },
					'100%': { transform: 'rotateY(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'coin-bounce': 'coin-bounce 1s ease-in-out',
				'rotate-coin': 'rotate-coin 1.5s linear'
			},
			boxShadow: {
				'neon': '0 0 5px rgba(155, 135, 245, 0.5), 0 0 20px rgba(155, 135, 245, 0.3)',
				'neon-hover': '0 0 10px rgba(155, 135, 245, 0.7), 0 0 30px rgba(155, 135, 245, 0.5)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
