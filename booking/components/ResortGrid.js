import ResortCard from "./ResortCard";

const ResortGrid = ({ resorts, title, subtitle }) => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {(title || subtitle) && (
          <div className="mb-12">
            {title && <h2 className="text-3xl md:text-4xl font-black mb-4">{title}</h2>}
            {subtitle && <p className="text-text-secondary text-lg max-w-2xl">{subtitle}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resorts.map((resort) => (
            <ResortCard key={resort.id} resort={resort} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResortGrid;
