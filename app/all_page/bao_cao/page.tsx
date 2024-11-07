import Header from "./Header";
export default function ApSuatPage() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <h1 className="text-3xl flex-1 flex items-center justify-center">
        Trang báo cáo
      </h1>
      <footer className="h-1 flex justify-center items-center gap-4 p-2 border-t bg-blue-100 text-[8px]">
        ĐÂY LÀ FOOTER
      </footer>
    </div>
  );
}
