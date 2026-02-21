import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, FolderKanban, Building2, Briefcase } from 'lucide-react';
import { Layout } from './components/Layout/Layout';
import { BentoGrid, BentoCard } from './components/Layout/BentoGrid';
import { getInstitutionById } from './data/institutions';

export const InstitutionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const institutionData = getInstitutionById(id || '');

    if (!institutionData) {
        return (
            <Layout>
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-pure)' }}>
                    <h1>Institution not found</h1>
                    <button className="btn" onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>Return to Map</button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div style={{ padding: '0 1.5rem', marginBottom: '1rem' }}>
                <button
                    className="btn btn-ghost"
                    onClick={() => navigate('/')}
                    style={{ padding: '0.5rem', borderRadius: 'var(--radius-full)' }}
                >
                    <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} /> Back to Campus Map
                </button>
            </div>

            <BentoGrid>
                {/* Header Content */}
                <BentoCard className="col-span-12 row-span-1" delay={100}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%' }}>
                        <div>
                            <div style={{ color: institutionData.color, fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                {institutionData.category}
                            </div>
                            <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                                {institutionData.name}
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
                                {institutionData.description}
                            </p>
                        </div>
                    </div>
                </BentoCard>

                {/* Quick Stats */}
                <BentoCard className="col-span-4 row-span-1" delay={200} style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(16,185,129,0.05))' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '100%' }}>
                        <div style={{ background: institutionData.color !== 'var(--text-muted)' ? institutionData.color : 'var(--bg-surface-3)', padding: '1rem', borderRadius: 'var(--radius-lg)' }}>
                            <Users size={32} color={institutionData.color !== 'var(--text-muted)' ? "white" : "var(--text-pure)"} />
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--text-pure)' }}>
                                {institutionData.facultyCount}
                            </div>
                            <div style={{ color: 'var(--color-brand-secondary)', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                                Total Faculty
                            </div>
                        </div>
                    </div>
                </BentoCard>

                <BentoCard className="col-span-4 row-span-1" delay={300} style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.1), rgba(139,92,246,0.05))' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '100%' }}>
                        <div style={{ background: 'var(--color-accent)', padding: '1rem', borderRadius: 'var(--radius-lg)' }}>
                            <Briefcase size={32} color="white" />
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--text-pure)' }}>
                                {institutionData.placementRate}
                            </div>
                            <div style={{ color: 'var(--color-accent)', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                                Placement Rate
                            </div>
                        </div>
                    </div>
                </BentoCard>

                <BentoCard className="col-span-4 row-span-1" delay={400}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '100%' }}>
                        <div style={{ background: 'var(--bg-surface-3)', border: '1px solid var(--border-strong)', padding: '1rem', borderRadius: 'var(--radius-lg)' }}>
                            <Building2 size={32} color="var(--text-secondary)" />
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--text-pure)' }}>
                                {institutionData.established}
                            </div>
                            <div style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                                Established
                            </div>
                        </div>
                    </div>
                </BentoCard>

                {/* Detailed Sections */}
                {institutionData.projects && institutionData.projects.length > 0 && (
                    <BentoCard className="col-span-6 row-span-2" delay={500}>
                        <div className="bento-header">
                            <h2 className="bento-title">Active Projects</h2>
                            <FolderKanban size={20} style={{ color: 'var(--text-muted)' }} />
                        </div>
                        <div className="bento-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {institutionData.projects.map((proj, idx) => (
                                <div key={idx} style={{ padding: '1rem', background: 'var(--bg-surface-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                                    <h3 style={{ color: 'var(--text-pure)', marginBottom: '0.25rem' }}>{proj.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </BentoCard>
                )}

                {/* Community Chat Placeholder */}
                <BentoCard className={institutionData.projects && institutionData.projects.length > 0 ? "col-span-6 row-span-2" : "col-span-12 row-span-2"} delay={600}>
                    <div className="bento-header">
                        <h2 className="bento-title">Department Discussion</h2>
                    </div>
                    <div className="bento-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-strong)' }}>
                        <p style={{ color: 'var(--text-muted)' }}>Context-aware chat interface initializing...</p>
                    </div>
                </BentoCard>

            </BentoGrid>
        </Layout>
    );
};
