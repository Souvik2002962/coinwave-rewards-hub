
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import NavBar from '@/components/NavBar';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { BriefcaseBusiness, Upload, Building2, Link as LinkIcon, User, Mail, Phone, BarChart, Video, Image as ImageIcon, LayoutList, Brain, Zap, Target, TrendingUp, TestTube, DollarSign, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCoinConversion } from '@/hooks/useCoinConversion';

const businessCategories = [
  { label: "Fashion", value: "fashion" },
  { label: "Tech", value: "tech" },
  { label: "Health", value: "health" },
  { label: "Gaming", value: "gaming" },
  { label: "Education", value: "education" },
  { label: "Food", value: "food" },
  { label: "Local Business", value: "local_business" },
  { label: "Other", value: "other" }
];

const marketingGoals = [
  { label: "Brand awareness", value: "brand_awareness" },
  { label: "Product sales", value: "product_sales" },
  { label: "App installs", value: "app_installs" },
  { label: "Website visits", value: "website_visits" },
  { label: "Foot traffic to shop", value: "foot_traffic" }
];

const adTypes = [
  { label: "Video", value: "video" },
  { label: "Image", value: "image" },
  { label: "Banner", value: "banner" },
  { label: "Interactive/Survey", value: "interactive" }
];

const formSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  brandLogo: z.any().optional(),
  businessCategory: z.string().min(1, "Please select a business category"),
  website: z.string().url("Please enter a valid URL"),
  contactName: z.string().min(2, "Contact name is required"),
  contactEmail: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  marketingGoals: z.array(z.string()).min(1, "Select at least one marketing goal"),
  adBudget: z.number().min(1000).max(100000),
  preferredAdType: z.string().min(1, "Please select a preferred ad type"),
  useAI: z.boolean(),
  preferredRegions: z.string().optional(),
  aiAdVariations: z.number().min(3).max(10).optional(),
  maxCoinPerView: z.number().min(5).max(50).optional(),
  enableABTesting: z.boolean().optional(),
  autoOptimization: z.boolean().optional(),
  dailyMaxSpend: z.number().min(100).max(10000).optional()
});

type FormValues = z.infer<typeof formSchema>;

const BecomeAdvertiser = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      businessCategory: "",
      website: "",
      contactName: "",
      contactEmail: "",
      phoneNumber: "",
      marketingGoals: [],
      adBudget: 5000,
      preferredAdType: "",
      useAI: false,
      preferredRegions: "",
      aiAdVariations: 5,
      maxCoinPerView: 15,
      enableABTesting: true,
      autoOptimization: true,
      dailyMaxSpend: 1000
    }
  });

  const [brandLogoPreview, setBrandLogoPreview] = React.useState<string | null>(null);
  const { setCoins, convertToINR } = useCoinConversion();
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("brandLogo", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setBrandLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getBudgetDisplay = (value: number) => {
    if (value < 5000) return "₹1,000 - ₹5,000";
    if (value < 25000) return "₹5,001 - ₹25,000";
    return "₹25,001 - ₹1L+";
  };

  const getBudgetCoins = (value: number) => {
    // Convert budget to approximate coins (assuming 1 rupee = 100 coins)
    const coins = value * 100;
    setCoins(coins);
    return coins.toLocaleString() + " coins";
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    toast.success("Advertiser application submitted successfully!");
    navigate("/create-campaign");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <NavBar />
      <div className="pt-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Become an Advertiser</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Reach millions of engaged users with your brand message. Create interactive ad campaigns
            and reward viewers with coins they can spend in our marketplace.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Info Section */}
            <Card className="neon-card overflow-visible">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>Tell us about your business or brand</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Brand Logo</FormLabel>
                  <div className="flex items-center gap-4">
                    <Input 
                      type="file" 
                      accept="image/*"
                      className="max-w-xs"
                      onChange={handleFileUpload}
                    />
                    {brandLogoPreview && (
                      <div className="h-16 w-16 rounded-md overflow-hidden">
                        <img 
                          src={brandLogoPreview} 
                          alt="Logo preview" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </FormItem>

                <FormField
                  control={form.control}
                  name="businessCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {businessCategories.map(category => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website or Social Media Page</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="https://your-website.com" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Contact Info Section */}
            <Card className="neon-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contact Information
                </CardTitle>
                <CardDescription>How can we reach you?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input type="email" placeholder="you@example.com" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input type="tel" placeholder="+91 9876543210" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Marketing Intent Section */}
            <Card className="neon-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Marketing Intent
                </CardTitle>
                <CardDescription>What do you hope to achieve with your ads?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="marketingGoals"
                  render={() => (
                    <FormItem>
                      <FormLabel>What do you want from your ads?</FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {marketingGoals.map((goal) => (
                          <FormField
                            key={goal.value}
                            control={form.control}
                            name="marketingGoals"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={goal.value}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(goal.value)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, goal.value])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== goal.value
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {goal.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="adBudget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly ad budget (approximate)</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <Slider
                            min={1000}
                            max={100000}
                            step={1000}
                            defaultValue={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                          <div className="text-center space-y-1">
                            <div className="text-sm font-medium text-neon-purple">
                              {getBudgetDisplay(field.value)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ≈ {getBudgetCoins(field.value)}
                            </div>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredAdType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Preferred ad type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                          {adTypes.map((type) => (
                            <FormItem key={type.value}>
                              <FormControl>
                                <div className="relative">
                                  <RadioGroupItem 
                                    value={type.value} 
                                    id={type.value} 
                                    className="peer sr-only"
                                  />
                                  <FormLabel 
                                    htmlFor={type.value} 
                                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                  >
                                    {type.value === 'video' && <Video className="mb-3 h-6 w-6" />}
                                    {type.value === 'image' && <ImageIcon className="mb-3 h-6 w-6" />}
                                    {type.value === 'banner' && <LayoutList className="mb-3 h-6 w-6" />}
                                    {type.value === 'interactive' && <Brain className="mb-3 h-6 w-6" />}
                                    {type.label}
                                  </FormLabel>
                                </div>
                              </FormControl>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* AI Smart Assist Setup */}
            <Card className="neon-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Smart Assist Setup
                </CardTitle>
                <CardDescription>
                  Let our AI automatically create multiple ad versions, test them, and optimize performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="useAI"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Enable AI-Powered Ad Generation & Optimization
                        </FormLabel>
                        <CardDescription>
                          Upload one asset → AI creates multiple versions → Auto A/B testing → Real-time optimization
                        </CardDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("useAI") && (
                  <div className="space-y-6 border-l-4 border-neon-purple pl-6">
                    {/* AI Features Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/30">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="h-5 w-5 text-neon-purple" />
                            <h4 className="font-semibold">Auto-Generate Variations</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            AI creates 5-10 ad copy variations with different CTAs and coin rewards from your single upload
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <TestTube className="h-5 w-5 text-green-400" />
                            <h4 className="font-semibold">Smart A/B Testing</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Automatic testing across different user groups to find the best performing versions
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="h-5 w-5 text-orange-400" />
                            <h4 className="font-semibold">Real-time Optimization</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            AI pauses poor performers and prioritizes high-engagement, cost-efficient ads
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-blue-400" />
                            <h4 className="font-semibold">Smart Coin Distribution</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Different coin rewards per ad to find the optimal engagement vs. cost balance
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* AI Configuration Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="aiAdVariations"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of AI-Generated Ad Variations</FormLabel>
                            <FormControl>
                              <div className="space-y-3">
                                <Slider
                                  min={3}
                                  max={10}
                                  step={1}
                                  value={[field.value || 5]}
                                  onValueChange={(value) => field.onChange(value[0])}
                                />
                                <div className="text-center">
                                  <span className="text-sm font-medium text-neon-purple">
                                    {field.value} variations
                                  </span>
                                  <p className="text-xs text-muted-foreground">
                                    More variations = better optimization potential
                                  </p>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maxCoinPerView"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum Coins Per Ad View</FormLabel>
                            <FormControl>
                              <div className="space-y-3">
                                <Slider
                                  min={5}
                                  max={50}
                                  step={5}
                                  value={[field.value || 15]}
                                  onValueChange={(value) => field.onChange(value[0])}
                                />
                                <div className="text-center">
                                  <span className="text-sm font-medium text-neon-purple">
                                    Up to {field.value} coins per view
                                  </span>
                                  <p className="text-xs text-muted-foreground">
                                    AI will create variations with different coin rewards
                                  </p>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="enableABTesting"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel className="text-sm font-medium">
                                Enable A/B Testing
                              </FormLabel>
                              <CardDescription className="text-xs">
                                Test different versions automatically
                              </CardDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="autoOptimization"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel className="text-sm font-medium">
                                Auto-Optimization
                              </FormLabel>
                              <CardDescription className="text-xs">
                                AI automatically pauses poor performers
                              </CardDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="dailyMaxSpend"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Daily Maximum Spend (Coins)</FormLabel>
                          <FormControl>
                            <div className="space-y-3">
                              <Slider
                                min={100}
                                max={10000}
                                step={100}
                                value={[field.value || 1000]}
                                onValueChange={(value) => field.onChange(value[0])}
                              />
                              <div className="text-center space-y-1">
                                <div className="text-sm font-medium text-neon-purple">
                                  {field.value?.toLocaleString()} coins per day
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  ≈ ₹{((field.value || 0) * 0.01).toFixed(2)} daily spend limit
                                </div>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredRegions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Audience & Regions</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="E.g., Urban millennials interested in fitness, tech enthusiasts in Bangalore, fashion lovers aged 18-35"
                              {...field}
                            />
                          </FormControl>
                          <CardDescription>
                            Describe your ideal audience - AI will use this for targeting optimization
                          </CardDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Benefits Summary */}
                    <Card className="bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 border-neon-purple/30">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-neon-purple" />
                          Expected Benefits with AI Assist
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-green-400">↑ 30-50%</span>
                            <p className="text-muted-foreground">Higher engagement rates</p>
                          </div>
                          <div>
                            <span className="font-medium text-blue-400">↓ 20-40%</span>
                            <p className="text-muted-foreground">Lower cost per conversion</p>
                          </div>
                          <div>
                            <span className="font-medium text-purple-400">⚡ 90%</span>
                            <p className="text-muted-foreground">Time saved on manual optimization</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row justify-center gap-4 pt-6">
              <Button
                type="submit"
                size="lg"
                className="glossy-button text-lg py-6 px-8"
              >
                <BriefcaseBusiness className="mr-2 h-5 w-5" />
                Submit & Create First Campaign
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BecomeAdvertiser;
