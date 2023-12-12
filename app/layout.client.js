'use client'
import NavBar from './navBar';
import { AppProvider } from './AppContext';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function ClientLayout({ children, navn }) {
    const activeSegment = useSelectedLayoutSegment()
    return (
        <AppProvider>
            <NavBar aktiv={activeSegment} navn={navn} />
            {children}
        </AppProvider>
    )
}