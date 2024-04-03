function Icon({ src, className }: { src: string; className: string }) {
  return (
    <img
      draggable="false"
      src={`${src}`}
      alt=""
      className={className}
      loading="lazy"
    />
  );
}

export default Icon;
