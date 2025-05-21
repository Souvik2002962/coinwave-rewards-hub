
import React, { useState } from 'react';
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
  FormMessage,
  FormDescription 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { 
  CalendarIcon, 
  Rocket, 
  Save,
  BadgeDollarSign,
  Target,
  Video,
  Image as ImageIcon, 
  Upload,
  MapPin,
  Tag,
  Link as LinkIcon,
  Smartphone,
  Tablet,
  Monitor,
  Coins
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const campaignObjectives = [
  { label: "Product Sales", value: "product_sales" },
  { label: "Brand Awareness", value: "brand_awareness" },
  { label: "App Install", value: "app_install" },
  { label: "Survey", value: "survey" }
];

const adFormats = [
  { label: "Video", value: "video", icon: Video },
  { label: "Image", value: "image", icon: ImageIcon },
  { label: "Survey", value: "survey", icon: Target }
];

const regions = [
  { label: "India", value: "india" },
  { label: "USA", value: "usa" },
  { label: "Europe", value: "europe" },
  { label: "Asia", value: "asia" },
  { label: "Custom Country", value: "custom" }
];

const ageGroups = [
  { label: "13-17", value: "13-17" },
  { label: "18-24", value: "18-24" },
  { label: "25-34", value: "25-34" },
  { label: "35-50", value: "35-50" },
  { label: "50+", value: "50+" }
];

const genders = [
  { label: "All", value: "all" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" }
];

const interests = [
  { label: "Fashion", value: "fashion" },
  { label: "Gaming", value: "gaming" },
  { label: "Travel", value: "travel" },
  { label: "Food", value: "food" },
  { label: "Tech", value: "tech" },
  { label: "Sports", value: "sports" },
  { label: "Music", value: "music" },
  { label: "Movies", value: "movies" }
];

const coinPayouts = [
  { label: "5 coins", value: "5" },
  { label: "10 coins", value: "10" },
  { label: "20 coins", value: "20" },
  { label: "50 coins", value: "50" }
];

const buttonLabels = [
  { label: "Buy Now", value: "buy_now" },
  { label: "Learn More", value: "learn_more" },
  { label: "Visit Site", value: "visit_site" },
  { label: "Download App", value: "download_app" },
  { label: "Get Offer", value: "get_offer" }
];

const formSchema = z.object({
  campaignName: z.string().min(2, "Campaign name is required"),
  campaignObjective: z.string().min(1, "Please select a campaign objective"),
  startDate: z.date({
    required_error: "Please select a start date",
  }),
  endDate: z.date({
    required_error: "Please select an end date",
  }).refine(date => date > new Date(), {
    message: "End date must be in the future",
  }),
  dailyBudget: z.number().min(100, "Minimum daily budget is ₹100"),
  adFormat: z.string().min(1, "Please select an ad format"),
  adContent: z.any().optional(),
  regions: z.array(z.string()).min(1, "Select at least one region"),
  ageGroups: z.array(z.string()).min(1, "Select at least one age group"),
  gender: z.string().min(1, "Please select a gender"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  coinPayout: z.string().min(1, "Please select coin payout per view"),
  maxDailyViews: z.number().min(1, "Please enter maximum daily views"),
  buttonLabel: z.string().min(1, "Please select a button label"),
  landingPage: z.string().url("Please enter a valid URL"),
  trackingCode: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [adPreview, setAdPreview] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'phone' | 'tablet' | 'web'>('phone');

  // Calculate tomorrow and 30 days later dates for defaults
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const thirtyDaysLater = new Date();
  thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campaignName: "",
      campaignObjective: "",
      startDate: tomorrow,
      endDate: thirtyDaysLater,
      dailyBudget: 500,
      adFormat: "",
      regions: [],
      ageGroups: [],
      gender: "all",
      interests: [],
      coinPayout: "10",
      maxDailyViews: 100,
      buttonLabel: "visit_site",
      landingPage: "",
      trackingCode: ""
    }
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("adContent", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAdPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate total budget
  const calculateTotalBudget = () => {
    const dailyBudget = form.watch("dailyBudget");
    const startDate = form.watch("startDate");
    const endDate = form.watch("endDate");
    
    if (!startDate || !endDate) return dailyBudget;
    
    const dayDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return dailyBudget * (dayDiff || 1);
  };

  // Calculate total coins to spend
  const calculateTotalCoins = () => {
    const coinPayout = parseInt(form.watch("coinPayout") || "0", 10);
    const maxDailyViews = form.watch("maxDailyViews") || 0;
    const startDate = form.watch("startDate");
    const endDate = form.watch("endDate");
    
    if (!startDate || !endDate) return coinPayout * maxDailyViews;
    
    const dayDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return coinPayout * maxDailyViews * (dayDiff || 1);
  };

  const onSubmit = (data: FormValues) => {
    console.log("Campaign created:", data);
    toast.success("Campaign created successfully!");
    navigate("/advertiser-dashboard");
  };

  const saveAsDraft = () => {
    const data = form.getValues();
    console.log("Campaign saved as draft:", data);
    toast.success("Campaign saved as draft!");
    navigate("/advertiser-dashboard");
  };

  const getButtonLabel = (value: string) => {
    return buttonLabels.find(label => label.value === value)?.label || value;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <NavBar />
      <div className="pt-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Create Campaign</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Build your ad campaign and start reaching your target audience. Set your budget, choose your targeting, and design your perfect ad.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Campaign Details */}
            <Card className="neon-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BadgeDollarSign className="h-5 w-5" />
                  Campaign Details
                </CardTitle>
                <CardDescription>Set up the basic details of your campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="campaignName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Summer Sale 2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="campaignObjective"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Objective</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select objective" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {campaignObjectives.map(objective => (
                            <SelectItem key={objective.value} value={objective.value}>
                              {objective.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date <= form.watch("startDate")}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="dailyBudget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Daily Budget (₹)</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <div className="flex items-center gap-4">
                            <Slider
                              min={100}
                              max={10000}
                              step={100}
                              defaultValue={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                              className="flex-1"
                            />
                            <Input 
                              type="number"
                              className="w-24"
                              value={field.value}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>₹100</span>
                            <span>₹10,000</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription className="flex justify-between">
                        <span>Total Campaign Budget:</span>
                        <span className="font-semibold text-neon-purple">₹{calculateTotalBudget().toLocaleString()}</span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Ad Format */}
            <Card className="neon-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Ad Format
                </CardTitle>
                <CardDescription>Choose your ad format and upload your content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="adFormat"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Choose Format</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                          {adFormats.map((format) => {
                            const Icon = format.icon;
                            return (
                              <FormItem key={format.value} className={`neon-border rounded-md p-4 space-y-2 cursor-pointer ${field.value === format.value ? 'bg-neon-purple/10 border-neon-purple' : ''}`}>
                                <FormControl>
                                  <div className="flex flex-col items-center space-y-2">
                                    <Icon className="h-8 w-8 text-neon-purple" />
                                    <RadioGroupItem value={format.value} id={format.value} className="sr-only" />
                                    <FormLabel htmlFor={format.value} className="cursor-pointer text-center font-medium">
                                      {format.label}
                                    </FormLabel>
                                    <FormDescription className="text-center text-xs">
                                      {format.value === 'video' && 'MP4, up to 30 sec'}
                                      {format.value === 'image' && 'JPG, PNG, 1:1 or 16:9'}
                                      {format.value === 'survey' && 'Multiple-choice or yes/no'}
                                    </FormDescription>
                                  </div>
                                </FormControl>
                              </FormItem>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("adFormat") && (
                  <div className="space-y-4">
                    <FormLabel>Upload Your Ad</FormLabel>
                    <div className="border-2 border-dashed border-input rounded-lg p-8 text-center">
                      <Input 
                        type="file" 
                        accept={form.watch("adFormat") === 'video' ? 'video/*' : 'image/*'} 
                        className="mx-auto max-w-sm mb-4" 
                        onChange={handleFileUpload}
                      />
                      <div className="text-sm text-muted-foreground">
                        {form.watch("adFormat") === 'video' ? 'Upload an MP4 video, up to 30 seconds' : 'Upload a JPG or PNG image in 1:1 or 16:9 ratio'}
                      </div>
                      <div className="mt-4 flex justify-center">
                        <Upload className="h-10 w-10 text-muted-foreground" />
                      </div>
                    </div>

                    {adPreview && (
                      <div className="mt-6 flex flex-col items-center">
                        <FormLabel>Ad Preview</FormLabel>
                        <div className="mt-2 max-w-md">
                          {form.watch("adFormat") === 'video' ? (
                            <video src={adPreview} controls className="w-full h-auto rounded-lg"></video>
                          ) : (
                            <img src={adPreview} alt="Ad preview" className="w-full h-auto rounded-lg" />
                          )}
                        </div>
                      </div>
                    )}

                    {form.watch("adFormat") === 'survey' && (
                      <div className="space-y-4">
                        <FormItem>
                          <FormLabel>Survey Question</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter your survey question" />
                          </FormControl>
                        </FormItem>

                        <FormItem>
                          <FormLabel>Answer Options (one per line)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Option 1&#10;Option 2&#10;Option 3" rows={4} />
                          </FormControl>
                        </FormItem>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Targeting Options */}
            <Card className="neon-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Targeting Options
                </CardTitle>
                <CardDescription>Define your target audience for this campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="regions"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-base">Audience Region</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {regions.map((region) => (
                          <FormField
                            key={region.value}
                            control={form.control}
                            name="regions"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={region.value}
                                  className="flex flex-row items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(region.value)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, region.value])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== region.value
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal flex items-center">
                                    <MapPin className="h-3 w-3 mr-1 opacity-70" />
                                    {region.label}
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
                  name="ageGroups"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-base">Age Group</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                        {ageGroups.map((age) => (
                          <FormField
                            key={age.value}
                            control={form.control}
                            name="ageGroups"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={age.value}
                                  className="flex flex-row items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(age.value)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, age.value])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== age.value
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {age.label}
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
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {genders.map(gender => (
                            <SelectItem key={gender.value} value={gender.value}>
                              {gender.label}
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
                  name="interests"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-base">Interests</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                        {interests.map((interest) => (
                          <FormField
                            key={interest.value}
                            control={form.control}
                            name="interests"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={interest.value}
                                  className="flex flex-row items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(interest.value)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, interest.value])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== interest.value
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal flex items-center">
                                    <Tag className="h-3 w-3 mr-1 opacity-70" />
                                    {interest.label}
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
              </CardContent>
            </Card>

            {/* Reward Settings */}
            <Card className="neon-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5" />
                  Reward Settings
                </CardTitle>
                <CardDescription>Set how many coins viewers will earn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="coinPayout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coin payout per view</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select coin amount" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {coinPayouts.map(payout => (
                            <SelectItem key={payout.value} value={payout.value}>
                              {payout.label}
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
                  name="maxDailyViews"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum daily views</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          min="1"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="p-4 bg-secondary rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total coins to spend:</span>
                    <span className="text-xl font-bold text-neon-purple">{calculateTotalCoins().toLocaleString()} coins</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Based on coin payout × max daily views × campaign duration
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Link & Tracking */}
            <Card className="neon-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  CTA Link & Tracking
                </CardTitle>
                <CardDescription>Set where viewers will go when they click your ad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="buttonLabel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Action Button Label</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select button text" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {buttonLabels.map(label => (
                            <SelectItem key={label.value} value={label.value}>
                              {label.label}
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
                  name="landingPage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Landing Page Link</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="https://your-website.com/landing-page" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="trackingCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Add UTM or Tracking Code (optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="utm_source=coincart&utm_medium=ad&utm_campaign=summer" {...field} />
                      </FormControl>
                      <FormDescription>
                        Add UTM parameters or other tracking codes for your analytics
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Live Preview */}
            <Card className="neon-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Live Preview
                </CardTitle>
                <CardDescription>See how your ad will appear to users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 justify-center mb-6">
                  <Button 
                    variant={viewMode === 'phone' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => setViewMode('phone')}
                  >
                    <Smartphone className="mr-1 h-4 w-4" />
                    Phone
                  </Button>
                  <Button 
                    variant={viewMode === 'tablet' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => setViewMode('tablet')}
                  >
                    <Tablet className="mr-1 h-4 w-4" />
                    Tablet
                  </Button>
                  <Button 
                    variant={viewMode === 'web' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => setViewMode('web')}
                  >
                    <Monitor className="mr-1 h-4 w-4" />
                    Web
                  </Button>
                </div>

                <div className="flex justify-center">
                  <div className={`relative border-4 border-gray-800 rounded-2xl bg-background overflow-hidden
                    ${viewMode === 'phone' ? 'w-64 h-128 max-h-[28rem]' : viewMode === 'tablet' ? 'w-96 h-128 max-h-[28rem]' : 'w-full max-w-3xl h-96'}`}
                  >
                    {/* Mock app UI */}
                    <div className="p-4 bg-cyber-dark h-full overflow-y-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue"></div>
                          <span className="text-sm font-bold text-white">CoinCart</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white">Earn {form.watch("coinPayout") || "10"} coins</span>
                        </div>
                      </div>
                      
                      {/* Ad preview */}
                      <div className="rounded-lg overflow-hidden bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 border border-neon-purple/30">
                        {adPreview ? (
                          form.watch("adFormat") === 'video' ? (
                            <video src={adPreview} controls className="w-full h-auto"></video>
                          ) : (
                            <img src={adPreview} alt="Ad preview" className="w-full h-auto" />
                          )
                        ) : (
                          <div className="aspect-video flex items-center justify-center bg-secondary">
                            {form.watch("adFormat") === 'video' ? (
                              <Video className="h-12 w-12 text-muted-foreground" />
                            ) : form.watch("adFormat") === 'image' ? (
                              <ImageIcon className="h-12 w-12 text-muted-foreground" />
                            ) : form.watch("adFormat") === 'survey' ? (
                              <div className="text-center p-4">
                                <p className="font-medium mb-4">Survey Question Will Appear Here</p>
                                <div className="space-y-2">
                                  <div className="p-2 bg-secondary/50 rounded-md">Option 1</div>
                                  <div className="p-2 bg-secondary/50 rounded-md">Option 2</div>
                                  <div className="p-2 bg-secondary/50 rounded-md">Option 3</div>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center text-muted-foreground">
                                <p>Ad preview will appear here</p>
                                <p className="text-xs mt-2">Upload content to see preview</p>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="p-3">
                          <p className="font-medium text-white">{form.watch("campaignName") || "Your Campaign Name"}</p>
                          <div className="mt-4 flex justify-between items-center">
                            <Button size="sm" className="glossy-button text-white">
                              {getButtonLabel(form.watch("buttonLabel")) || "Visit Site"}
                            </Button>
                            <div className="flex items-center gap-1">
                              <Coins className="h-4 w-4 text-yellow-400" />
                              <span className="text-sm font-medium text-white">+{form.watch("coinPayout") || "10"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row justify-center gap-4 pt-6">
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="border-neon-purple text-neon-purple text-lg py-6"
                onClick={saveAsDraft}
              >
                <Save className="mr-2 h-5 w-5" />
                Save as Draft
              </Button>
              
              <Button
                type="submit"
                size="lg"
                className="glossy-button text-lg py-6 px-8"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Launch Campaign
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCampaign;
