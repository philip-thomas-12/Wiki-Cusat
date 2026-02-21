import type { LatLngExpression } from 'leaflet';

export interface Institution {
    id: string;
    name: string;
    category: string;
    description: string;
    position: LatLngExpression;
    facultyCount: number | string;
    placementRate: string;
    established: number;
    color: string;
    projects?: { title: string; description: string }[];
}

export const institutions: Institution[] = [
    // Academic Departments
    {
        id: 'soec',
        name: 'School of Engineering',
        category: 'Engineering',
        description: 'Premier engineering hub offering B.Tech and M.Tech programs with top-tier placements.',
        position: [10.043, 76.324],
        facultyCount: 120,
        placementRate: '95%',
        established: 1979,
        color: 'var(--color-brand-secondary)', // Electric Blue
        projects: [
            { title: 'AI-Driven Campus Security', description: 'Computer Vision tracking for unauthorized perimeter access.' },
            { title: 'Smart Grid Management', description: 'Optimization algorithms for university power distribution.' }
        ]
    },
    {
        id: 'dcs',
        name: 'Department of Computer Science',
        category: 'Computer Science',
        description: 'Leading research and education in software architecture, AI, and distributed systems.',
        position: [10.045, 76.328],
        facultyCount: 45,
        placementRate: '98%',
        established: 1984,
        color: 'var(--color-brand-primary)', // Purple
        projects: [
            { title: 'Distributed Ledger for Credentials', description: 'Blockchain verification for student graduation certificates.' }
        ]
    },
    {
        id: 'ship-tech',
        name: 'Department of Ship Technology',
        category: 'Technology',
        description: 'One of the pioneers in Naval Architecture education in India.',
        position: [10.046, 76.326],
        facultyCount: 25,
        placementRate: '90%',
        established: 1974,
        color: 'var(--color-brand-secondary)'
    },
    {
        id: 'polymer',
        name: 'Dept. of Polymer Science & Rubber Tech',
        category: 'Technology',
        description: 'Specialized department focusing on polymer chemistry and rubber production tech.',
        position: [10.042, 76.327],
        facultyCount: 20,
        placementRate: '85%',
        established: 1971,
        color: 'var(--color-brand-secondary)'
    },
    {
        id: 'applied-chem',
        name: 'Department of Applied Chemistry',
        category: 'Science',
        description: 'Advanced chemistry research including an Electronics Lab for measurement.',
        position: [10.044, 76.322],
        facultyCount: 30,
        placementRate: '80%',
        established: 1976,
        color: 'var(--color-brand-tertiary)' // Green
    },
    {
        id: 'sms',
        name: 'School of Management Studies',
        category: 'Management',
        description: 'Offering renowned MBA programs with excellent corporate connections.',
        position: [10.047, 76.325],
        facultyCount: 40,
        placementRate: '92%',
        established: 1964,
        color: 'var(--color-accent)' // Pink
    },

    // Facilities
    {
        id: 'library',
        name: 'Central University Library',
        category: 'Facility',
        description: 'Fully computerized library providing vast academic resources, journals, and quiet study spaces.',
        position: [10.039, 76.325],
        facultyCount: 'N/A',
        placementRate: 'N/A',
        established: 1971,
        color: 'var(--color-brand-tertiary)'
    },
    {
        id: 'stic',
        name: 'Sophisticated Test & Instrumentation Centre',
        category: 'Research Lab',
        description: 'Advanced facilities for scientific testing and research analysis.',
        position: [10.041, 76.330],
        facultyCount: 25,
        placementRate: 'N/A',
        established: 1995,
        color: 'var(--color-accent)'
    },
    {
        id: 'admin',
        name: 'Administrative Office',
        category: 'Administration',
        description: 'The central hub for all CUSAT administrative, admission, and financial operations.',
        position: [10.036, 76.321],
        facultyCount: 'N/A',
        placementRate: 'N/A',
        established: 1971,
        color: 'var(--text-muted)'
    },
    {
        id: 'health',
        name: 'Health Centre',
        category: 'Facility',
        description: 'Providing primary medical care for students and staff on campus.',
        position: [10.040, 76.322],
        facultyCount: 'N/A',
        placementRate: 'N/A',
        established: 1980,
        color: 'var(--text-muted)'
    },
    {
        id: 'triveni',
        name: 'Triveni Coffee House',
        category: 'Canteen',
        description: 'Famous campus canteen serving the student body.',
        position: [10.042, 76.329],
        facultyCount: 'N/A',
        placementRate: 'N/A',
        established: 1990,
        color: 'var(--text-muted)'
    },

    // Hostels
    {
        id: 'sanathana',
        name: 'Sanathana Boys Hostel',
        category: 'Hostel',
        description: 'One of the primary residential facilities for male students.',
        position: [10.038, 76.326],
        facultyCount: 'N/A',
        placementRate: 'N/A',
        established: 1985,
        color: '#f59e0b' // Amber/Yellow for hostels
    },
    {
        id: 'siberia',
        name: 'Siberia Boys Hostel',
        category: 'Hostel',
        description: 'Residential facility for engineering students.',
        position: [10.048, 76.322],
        facultyCount: 'N/A',
        placementRate: 'N/A',
        established: 1995,
        color: '#f59e0b'
    },
    {
        id: 'anaswara',
        name: 'Anaswara Girls Hostel',
        category: 'Hostel',
        description: 'Primary residential facility for female students.',
        position: [10.037, 76.328],
        facultyCount: 'N/A',
        placementRate: 'N/A',
        established: 1990,
        color: '#f59e0b'
    }
];

export const getInstitutionById = (id: string): Institution | undefined => {
    return institutions.find(inst => inst.id === id);
};
