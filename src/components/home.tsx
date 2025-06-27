import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  Menu,
  X,
  ChevronRight,
  CreditCard,
  QrCode,
  User,
  Clock,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Home = () => {
  const [language, setLanguage] = useState<"vi" | "en">("vi");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock user state - in a real app, this would come from authentication context
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar?: string;
  } | null>({
    name: "Nguyễn Văn A",
    email: "nguyen.van.a@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NguyenVanA",
  });

  const toggleLanguage = () => {
    setLanguage(language === "vi" ? "en" : "vi");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    setUser(null);
    console.log("User logged out");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const translations = {
    vi: {
      navHome: "Trang chủ",
      navTickets: "Vé",
      navAccount: "Tài khoản",
      heroTitle: "Tuyến Metro Bến Thành - Suối Tiên",
      heroSubtitle: "Mua vé trực tuyến nhanh chóng và tiện lợi",
      getStarted: "Bắt đầu",
      ticketTypes: "Loại vé",
      singleTrip: "Vé lượt",
      singleTripDesc: "Vé một lượt từ 6.000đ đến 20.000đ",
      dailyPass: "Vé ngày",
      dailyPassDesc: "Vé không giới hạn trong ngày - 40.000đ",
      threeDayPass: "Vé 3 ngày",
      threeDayPassDesc: "Vé không giới hạn trong 3 ngày - 90.000đ",
      monthlyPass: "Vé tháng",
      monthlyPassDesc: "Vé không giới hạn trong tháng - 300.000đ",
      buyNow: "Mua ngay",
      loginRegister: "Đăng nhập / Đăng ký",
      loginTab: "Đăng nhập",
      registerTab: "Đăng ký",
      email: "Email",
      password: "Mật khẩu",
      login: "Đăng nhập",
      register: "Đăng ký",
      fullName: "Họ và tên",
      phone: "Số điện thoại",
      confirmPassword: "Xác nhận mật khẩu",
      priorityGroups: "Nhóm ưu tiên",
      student: "Sinh viên",
      elderly: "Người cao tuổi",
      disabled: "Người khuyết tật",
      paymentMethods: "Phương thức thanh toán",
      creditCard: "Thẻ tín dụng",
      qrCode: "Mã QR",
      stations: "Các trạm",
      stationsCount: "14 trạm từ Bến Thành đến Suối Tiên",
      accountBenefits: "Lợi ích tài khoản",
      purchaseHistory: "Lịch sử mua vé",
      digitalTickets: "Vé điện tử",
      discounts: "Giảm giá ưu tiên",
      new: "Mới",
      welcome: "Xin chào",
      myAccount: "Tài khoản của tôi",
      settings: "Cài đặt",
      logout: "Đăng xuất",
    },
    en: {
      navHome: "Home",
      navTickets: "Tickets",
      navAccount: "Account",
      heroTitle: "Ben Thanh - Suoi Tien Metro Line",
      heroSubtitle: "Purchase tickets online quickly and conveniently",
      getStarted: "Get Started",
      ticketTypes: "Ticket Types",
      singleTrip: "Single Trip",
      singleTripDesc: "One-way ticket from 6,000 to 20,000 VND",
      dailyPass: "Daily Pass",
      dailyPassDesc: "Unlimited rides for one day - 40,000 VND",
      threeDayPass: "3-Day Pass",
      threeDayPassDesc: "Unlimited rides for three days - 90,000 VND",
      monthlyPass: "Monthly Pass",
      monthlyPassDesc: "Unlimited rides for one month - 300,000 VND",
      buyNow: "Buy Now",
      loginRegister: "Login / Register",
      loginTab: "Login",
      registerTab: "Register",
      email: "Email",
      password: "Password",
      login: "Login",
      register: "Register",
      fullName: "Full Name",
      phone: "Phone Number",
      confirmPassword: "Confirm Password",
      priorityGroups: "Priority Groups",
      student: "Student",
      elderly: "Elderly",
      disabled: "Disabled",
      paymentMethods: "Payment Methods",
      creditCard: "Credit Card",
      qrCode: "QR Code",
      stations: "Stations",
      stationsCount: "14 stations from Ben Thanh to Suoi Tien",
      accountBenefits: "Account Benefits",
      purchaseHistory: "Purchase History",
      digitalTickets: "Digital Tickets",
      discounts: "Priority Discounts",
      new: "New",
      welcome: "Welcome",
      myAccount: "My Account",
      settings: "Settings",
      logout: "Logout",
    },
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=50&q=80"
              alt="Metro Logo"
              className="h-8 w-8 rounded-md"
            />
            <span className="font-bold text-lg hidden md:inline-block">
              HCMC Metro
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-primary">
              {t.navHome}
            </Link>
            <Link
              to="/tickets"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {t.navTickets}
            </Link>
            <Link
              to="/account"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {t.navAccount}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              aria-label="Toggle language"
            >
              <Globe className="h-5 w-5" />
              <span className="ml-2 hidden md:inline-block">
                {language === "vi" ? "EN" : "VI"}
              </span>
            </Button>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden md:block text-sm font-medium text-foreground">
                  {t.welcome}, {user.name.split(" ")[0]}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/account" className="flex items-center">
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>{t.myAccount}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{t.settings}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t.logout}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button variant="outline" asChild className="hidden md:flex">
                <Link to="/auth">{t.loginRegister}</Link>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-16">
          <nav className="container flex flex-col gap-4 p-4">
            <Link
              to="/"
              className="flex items-center justify-between p-2 text-primary font-medium border-b"
            >
              {t.navHome} <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              to="/tickets"
              className="flex items-center justify-between p-2 text-foreground font-medium border-b"
            >
              {t.navTickets} <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              to="/account"
              className="flex items-center justify-between p-2 text-foreground font-medium border-b"
            >
              {t.navAccount} <ChevronRight className="h-4 w-4" />
            </Link>
            {user ? (
              <div className="p-2 border-b">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Link
                    to="/account"
                    className="flex items-center justify-between p-2 text-foreground font-medium hover:bg-muted rounded-md"
                  >
                    <span className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4" />
                      {t.myAccount}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-between p-2 text-red-600 font-medium hover:bg-red-50 rounded-md w-full text-left"
                  >
                    <span className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      {t.logout}
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center justify-between p-2 text-foreground font-medium border-b"
              >
                {t.loginRegister} <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-[#003087] text-white py-16 md:py-24">
        <div className="container flex flex-col items-center text-center gap-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl">
            {t.heroSubtitle}
          </p>
          <Button
            size="lg"
            className="mt-4 bg-white text-[#003087] hover:bg-white/90"
          >
            {t.getStarted} <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </div>
      </section>

      {/* Ticket Types Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            {t.ticketTypes}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Single Trip Ticket */}
            <Card>
              <CardHeader>
                <CardTitle>{t.singleTrip}</CardTitle>
                <CardDescription>{t.singleTripDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="https://images.unsplash.com/photo-1581262177000-8139a463e531?w=400&q=80"
                  alt="Single Trip Ticket"
                  className="rounded-md w-full h-32 object-cover"
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full">{t.buyNow}</Button>
              </CardFooter>
            </Card>

            {/* Daily Pass */}
            <Card>
              <CardHeader>
                <CardTitle>{t.dailyPass}</CardTitle>
                <CardDescription>{t.dailyPassDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="https://images.unsplash.com/photo-1565043534407-2db36dc4fd4a?w=400&q=80"
                  alt="Daily Pass"
                  className="rounded-md w-full h-32 object-cover"
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full">{t.buyNow}</Button>
              </CardFooter>
            </Card>

            {/* 3-Day Pass */}
            <Card>
              <CardHeader>
                <CardTitle>{t.threeDayPass}</CardTitle>
                <CardDescription>{t.threeDayPassDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="https://images.unsplash.com/photo-1517737812598-1a43d0ef2a60?w=400&q=80"
                  alt="3-Day Pass"
                  className="rounded-md w-full h-32 object-cover"
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full">{t.buyNow}</Button>
              </CardFooter>
            </Card>

            {/* Monthly Pass */}
            <Card>
              <CardHeader className="relative">
                <Badge className="absolute top-0 right-0 bg-green-600">
                  {t.new}
                </Badge>
                <CardTitle>{t.monthlyPass}</CardTitle>
                <CardDescription>{t.monthlyPassDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src="https://images.unsplash.com/photo-1568736772245-26914aae0b09?w=400&q=80"
                  alt="Monthly Pass"
                  className="rounded-md w-full h-32 object-cover"
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full">{t.buyNow}</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Stations */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{t.stations}</h3>
              </div>
              <p className="text-muted-foreground mb-4">{t.stationsCount}</p>
              <img
                src="https://images.unsplash.com/photo-1569839333583-7375336cde4b?w=600&q=80"
                alt="Metro Stations Map"
                className="rounded-lg w-full h-64 object-cover"
              />
            </div>

            {/* Payment Methods */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{t.paymentMethods}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 border rounded-lg bg-card">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span>{t.creditCard}</span>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg bg-card">
                  <QrCode className="h-5 w-5 text-primary" />
                  <span>{t.qrCode}</span>
                </div>
              </div>

              {/* Account Benefits */}
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{t.accountBenefits}</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>{t.purchaseHistory}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>{t.digitalTickets}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>{t.discounts}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login/Register Section */}
      <section className="py-12 md:py-16">
        <div className="container max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">{t.loginRegister}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">{t.loginTab}</TabsTrigger>
                  <TabsTrigger value="register">{t.registerTab}</TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.email}</label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded-md"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.password}</label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded-md"
                      placeholder="********"
                    />
                  </div>
                  <Button className="w-full">{t.login}</Button>
                </TabsContent>
                <TabsContent value="register" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.fullName}</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="Nguyen Van A"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.email}</label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded-md"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.phone}</label>
                    <input
                      type="tel"
                      className="w-full p-2 border rounded-md"
                      placeholder="0901234567"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.password}</label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded-md"
                      placeholder="********"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t.confirmPassword}
                    </label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded-md"
                      placeholder="********"
                    />
                  </div>
                  <Button className="w-full">{t.register}</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=50&q=80"
              alt="Metro Logo"
              className="h-8 w-8 rounded-md"
            />
            <span className="font-bold">HCMC Metro</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2023 HURC1.{" "}
            {language === "vi"
              ? "Đã đăng ký bản quyền."
              : "All rights reserved."}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
